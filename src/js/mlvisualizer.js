/* ML metric visualizer.
 *
 * Every panel on the page is a view onto one of two shared samples — a
 * regression sample and a binary-classification sample. Drag a point in any
 * panel and every panel showing that sample redraws, so the same nudge can be
 * read through several metrics at once.
 *
 * Markup contract: <figure class="mlv-figure" data-mlv="mae"> … </figure>
 * Optional controls, each keyed by family (regression|binary):
 *   <button data-mlv-new>       redraw the whole sample, truth included
 *   <button data-mlv-perfect>   set every prediction equal to its truth
 *   <button data-mlv-together>  toggle: dragging moves all predictions at once
 */
(function () {
  "use strict";

  if (typeof d3 === "undefined") return;

  var REG_N = 24;
  var BIN_N = 24;
  var N_BINS = 5;
  var MARGIN = { top: 8, right: 10, bottom: 26, left: 32 };
  var MARGIN_SMALL = { top: 6, right: 8, bottom: 20, left: 24 };

  // ---------------------------------------------------------------- state
  var regression = []; // { id, x: true value, y: prediction }, both z-scored
  var binary = []; // { id, cls: 0|1, p: predicted probability, jitter }
  var regDomain = [-2.5, 2.5];
  var metrics = { regression: null, binary: null };
  var together = { regression: false, binary: false };

  var panels = [];
  var byPlotNode = new Map();
  var pending = new Set();
  var frame = null;

  // ------------------------------------------------------------ utilities
  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function fmt(v, digits) {
    return v.toFixed(digits === undefined ? 3 : digits);
  }

  // Probabilities are shifted on the log-odds scale, where a translation is
  // both unbounded and monotone — so a group move can never reorder anything.
  function logit(p) {
    var q = clamp(p, 0.005, 0.995);
    return Math.log(q / (1 - q));
  }

  function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  function zScore(values) {
    var mean = values.reduce(function (s, v) {
      return s + v;
    }, 0) / values.length;
    var variance = values.reduce(function (s, v) {
      return s + (v - mean) * (v - mean);
    }, 0) / values.length;
    var sd = Math.sqrt(variance) || 1;
    return values.map(function (v) {
      return (v - mean) / sd;
    });
  }

  // ------------------------------------------------------- data generation
  function makeRegression() {
    var rawX = [];
    var rawY = [];
    for (var i = 0; i < REG_N; i++) {
      var x = (Math.random() * 2 - 1) * 55;
      var noise = (Math.random() * 2 - 1) * 18;
      var heteroscedastic = (Math.random() * 2 - 1) * (6 + Math.abs(x) * 0.22);
      var outlier = Math.random() < 0.14 ? (Math.random() * 2 - 1) * 28 : 0;
      rawX.push(x);
      rawY.push(0.72 * x + noise + heteroscedastic + outlier);
    }
    var zx = zScore(rawX);
    var zy = zScore(rawY);
    regression = zx.map(function (x, i) {
      return { id: i, x: x, y: zy[i] };
    });

    var extent = d3.max(regression, function (d) {
      return Math.max(Math.abs(d.x), Math.abs(d.y));
    });
    var limit = Math.ceil(Math.max(2.2, extent * 1.12) * 10) / 10;
    regDomain = [-limit, limit];
  }

  function makeBinary() {
    binary = [];
    for (var i = 0; i < BIN_N; i++) {
      var cls = Math.random() > 0.5 ? 1 : 0;
      var center = cls === 1 ? 0.55 + Math.random() * 0.35 : 0.1 + Math.random() * 0.35;
      var overlap = (Math.random() - 0.5) * (0.28 + Math.random() * 0.22);
      var shift = (Math.random() - 0.5) * 0.18;
      var miss = Math.random() < 0.18
        ? (cls === 1 ? -(0.3 + Math.random() * 0.25) : 0.3 + Math.random() * 0.25)
        : 0;
      binary.push({
        id: i,
        cls: cls,
        p: clamp(center + overlap + shift + miss, 0.01, 0.99),
        jitter: clamp(cls + (Math.random() - 0.5) * 0.1, 0.035, 0.965)
      });
    }
  }

  // ----------------------------------------------------------- metrics
  function computeRegression() {
    var n = regression.length;
    var sumAbs = 0;
    var sumSq = 0;
    regression.forEach(function (d) {
      var e = d.y - d.x;
      sumAbs += Math.abs(e);
      sumSq += e * e;
    });

    var concordant = 0;
    var comparable = 0;
    var pairs = [];
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var a = regression[i];
        var b = regression[j];
        if (a.x === b.x) continue;
        comparable++;
        var lo = a.x < b.x ? a : b;
        var hi = a.x < b.x ? b : a;
        var kind;
        if (hi.y > lo.y) {
          concordant += 1;
          kind = "conc";
        } else if (hi.y === lo.y) {
          concordant += 0.5;
          kind = "tie";
        } else {
          kind = "disc";
        }
        pairs.push({ x1: lo.x, y1: lo.y, x2: hi.x, y2: hi.y, kind: kind });
      }
    }

    return {
      mae: sumAbs / n,
      mse: sumSq / n,
      cindex: comparable ? concordant / comparable : 0.5,
      pairs: pairs
    };
  }

  function computeBinary() {
    var n = binary.length;
    var sumSq = 0;
    binary.forEach(function (d) {
      var e = d.p - d.cls;
      sumSq += e * e;
    });

    var positives = binary.filter(function (d) {
      return d.cls === 1;
    });
    var negatives = binary.filter(function (d) {
      return d.cls === 0;
    });

    var concordant = 0;
    var pairs = [];
    positives.forEach(function (p) {
      negatives.forEach(function (q) {
        var kind;
        if (p.p > q.p) {
          concordant += 1;
          kind = "conc";
        } else if (p.p === q.p) {
          concordant += 0.5;
          kind = "tie";
        } else {
          kind = "disc";
        }
        pairs.push({ x1: q.p, y1: q.jitter, x2: p.p, y2: p.jitter, kind: kind });
      });
    });
    var totalPairs = positives.length * negatives.length;

    // Equal-count bins over the predicted probability.
    var sorted = binary.slice().sort(function (a, b) {
      return a.p - b.p;
    });
    var base = Math.floor(sorted.length / N_BINS);
    var remainder = sorted.length % N_BINS;
    var bins = [];
    var start = 0;
    for (var i = 0; i < N_BINS && start < sorted.length; i++) {
      var size = base + (i < remainder ? 1 : 0);
      var end = Math.min(sorted.length, start + size);
      var members = sorted.slice(start, end);
      if (members.length) {
        var meanPred = d3.mean(members, function (d) {
          return d.p;
        });
        var meanTrue = d3.mean(members, function (d) {
          return d.cls;
        });
        bins.push({
          id: i,
          meanPred: meanPred,
          meanTrue: meanTrue,
          weight: members.length / n,
          upper: end >= sorted.length ? 1 : (members[members.length - 1].p + sorted[end].p) / 2
        });
      }
      start = end;
    }

    var mce = bins.reduce(function (s, b) {
      return s + Math.pow(b.meanPred - b.meanTrue, 2) * b.weight;
    }, 0);

    return {
      brier: sumSq / n,
      auc: totalPairs ? concordant / totalPairs : 0.5,
      mce: mce,
      pairs: pairs,
      bins: bins,
      thresholds: bins.slice(0, -1).map(function (b) {
        return { id: b.id, value: b.upper };
      })
    };
  }

  function recompute() {
    metrics.regression = computeRegression();
    metrics.binary = computeBinary();
  }

  // ------------------------------------------------------------ panel spec
  var SPEC = {
    mae: {
      family: "regression",
      label: "MAE",
      read: function (m) {
        return fmt(m.mae);
      },
      render: renderMAE
    },
    mse: {
      family: "regression",
      label: "MSE",
      read: function (m) {
        return fmt(m.mse);
      },
      render: renderMSE
    },
    cindex: {
      family: "regression",
      label: "C-index",
      read: function (m) {
        return fmt(m.cindex);
      },
      render: renderPairs
    },
    brier: {
      family: "binary",
      label: "Brier score",
      read: function (m) {
        return fmt(m.brier);
      },
      render: renderBrier
    },
    mce: {
      family: "binary",
      label: "Calibration error",
      read: function (m) {
        return fmt(m.mce);
      },
      render: renderMCE
    },
    auc: {
      family: "binary",
      label: "AUC",
      read: function (m) {
        return fmt(m.auc);
      },
      render: renderPairs
    }
  };

  // --------------------------------------------------------- error layers
  function renderMAE(p, g, x, y) {
    g.selectAll("line.mlv-resid")
      .data(regression, function (d) {
        return d.id;
      })
      .join("line")
      .attr("class", "mlv-resid")
      .attr("x1", function (d) {
        return x(d.x);
      })
      .attr("x2", function (d) {
        return x(d.x);
      })
      .attr("y1", function (d) {
        return y(d.y);
      })
      .attr("y2", function (d) {
        return y(d.x);
      });
  }

  function renderMSE(p, g, x, y) {
    g.selectAll("rect.mlv-square")
      .data(regression, function (d) {
        return d.id;
      })
      .join("rect")
      .attr("class", "mlv-square")
      .attr("x", function (d) {
        return x(Math.min(d.x, d.y));
      })
      .attr("y", function (d) {
        return y(Math.max(d.x, d.y));
      })
      .attr("width", function (d) {
        return Math.abs(x(d.y) - x(d.x));
      })
      .attr("height", function (d) {
        return Math.abs(y(d.y) - y(d.x));
      });
  }

  // Shared by C-index and AUC: one segment per comparable pair.
  function renderPairs(p, g, x, y) {
    var pairs = metrics[p.spec.family].pairs;
    g.selectAll("line.mlv-pair")
      .data(pairs)
      .join("line")
      .attr("class", function (d) {
        return "mlv-pair mlv-pair--" + d.kind;
      })
      .attr("x1", function (d) {
        return x(d.x1);
      })
      .attr("y1", function (d) {
        return y(d.y1);
      })
      .attr("x2", function (d) {
        return x(d.x2);
      })
      .attr("y2", function (d) {
        return y(d.y2);
      });
  }

  function renderBrier(p, g, x, y) {
    g.selectAll("rect.mlv-square")
      .data(binary, function (d) {
        return d.id;
      })
      .join("rect")
      .attr("class", "mlv-square")
      .attr("x", function (d) {
        return x(Math.min(d.p, d.cls));
      })
      .attr("y", function (d) {
        return y(Math.max(d.p, d.cls));
      })
      .attr("width", function (d) {
        return Math.abs(x(d.p) - x(d.cls));
      })
      .attr("height", function (d) {
        return Math.abs(y(d.p) - y(d.cls));
      });
  }

  function renderMCE(p, g, x, y) {
    var m = metrics.binary;

    g.selectAll("line.mlv-threshold")
      .data(m.thresholds, function (d) {
        return d.id;
      })
      .join("line")
      .attr("class", "mlv-threshold")
      .attr("x1", function (d) {
        return x(d.value);
      })
      .attr("x2", function (d) {
        return x(d.value);
      })
      .attr("y1", y(0))
      .attr("y2", y(1));

    g.selectAll("rect.mlv-square")
      .data(m.bins, function (d) {
        return d.id;
      })
      .join("rect")
      .attr("class", "mlv-square")
      .attr("x", function (d) {
        return x(Math.min(d.meanPred, d.meanTrue));
      })
      .attr("y", function (d) {
        return y(Math.max(d.meanPred, d.meanTrue));
      })
      .attr("width", function (d) {
        return Math.abs(x(d.meanPred) - x(d.meanTrue));
      })
      .attr("height", function (d) {
        return Math.abs(y(d.meanPred) - y(d.meanTrue));
      });

    g.selectAll("circle.mlv-bin")
      .data(m.bins, function (d) {
        return d.id;
      })
      .join("circle")
      .attr("class", "mlv-bin")
      .attr("r", p.small ? 3 : 4)
      .attr("cx", function (d) {
        return x(d.meanPred);
      })
      .attr("cy", function (d) {
        return y(d.meanTrue);
      });
  }

  // -------------------------------------------------------------- drawing
  function draw(p) {
    // lastWidth is kept fresh by the ResizeObserver, so dragging never forces
    // a synchronous layout.
    var width = p.lastWidth || Math.floor(p.plot.clientWidth);
    if (!width) return;

    var m = p.small ? MARGIN_SMALL : MARGIN;
    var side = Math.max(80, width - m.left - m.right);
    var outerW = side + m.left + m.right;
    var outerH = side + m.top + m.bottom;

    p.svg
      .attr("width", outerW)
      .attr("height", outerH)
      .attr("viewBox", "0 0 " + outerW + " " + outerH);

    var isBinary = p.spec.family === "binary";
    var domain = isBinary ? [0, 1] : regDomain;
    var x = d3.scaleLinear().domain(domain).range([0, side]);
    var y = d3.scaleLinear().domain(domain).range([side, 0]);
    p.x = x;
    p.y = y;

    var root = p.root.attr("transform", "translate(" + m.left + "," + m.top + ")");

    // Axes sit on the frame for probabilities, on the origin for z-scores.
    var ticks = p.small ? 3 : 5;
    p.axisX
      .attr("transform", "translate(0," + (isBinary ? side : y(0)) + ")")
      .call(d3.axisBottom(x).ticks(ticks).tickSize(3).tickPadding(4));
    p.axisY
      .attr("transform", "translate(" + (isBinary ? 0 : x(0)) + ",0)")
      .call(d3.axisLeft(y).ticks(ticks).tickSize(3).tickPadding(4));

    p.diag
      .attr("x1", x(domain[0]))
      .attr("y1", y(domain[0]))
      .attr("x2", x(domain[1]))
      .attr("y2", y(domain[1]));

    // Reference lines for the two true classes.
    p.rules
      .selectAll("line")
      .data(isBinary ? [0, 1] : [])
      .join("line")
      .attr("class", "mlv-rule")
      .attr("x1", x(0))
      .attr("x2", x(1))
      .attr("y1", function (d) {
        return y(d);
      })
      .attr("y2", function (d) {
        return y(d);
      });

    p.labelX
      .attr("x", side / 2)
      .attr("y", side + m.bottom - 4)
      .text(isBinary ? "Predicted probability" : "True value");
    p.labelY
      .attr("x", -side / 2)
      .attr("y", -m.left + 10)
      .text(isBinary ? "True class" : "Prediction");

    p.spec.render(p, p.errorLayer, x, y);
    drawPoints(p, x, y);

    p.value.textContent = p.spec.read(metrics[p.spec.family]);
  }

  function drawPoints(p, x, y) {
    var isBinary = p.spec.family === "binary";
    var data = isBinary ? binary : regression;

    p.pointLayer
      .selectAll("circle.mlv-point")
      .data(data, function (d) {
        return d.id;
      })
      .join(function (enter) {
        return enter
          .append("circle")
          .attr("class", "mlv-point")
          .call(p.drag);
      })
      .attr("r", p.small ? 3 : 4)
      .attr("cx", function (d) {
        return x(isBinary ? d.p : d.x);
      })
      .attr("cy", function (d) {
        return y(isBinary ? d.jitter : d.y);
      });
  }

  function scheduleFrame() {
    if (frame) return;
    frame = requestAnimationFrame(function () {
      frame = null;
      var todo = Array.from(pending);
      pending.clear();
      todo.forEach(draw);
    });
  }

  function queueFamily(family) {
    panels.forEach(function (p) {
      if (p.spec.family === family) pending.add(p);
    });
    scheduleFrame();
  }

  function queueAll() {
    panels.forEach(function (p) {
      pending.add(p);
    });
    scheduleFrame();
  }

  // ------------------------------------------------------------- shortcuts
  function makePerfect(family) {
    if (family === "binary") {
      binary.forEach(function (d) {
        d.p = d.cls;
      });
    } else {
      regression.forEach(function (d) {
        d.y = d.x;
      });
    }
  }

  function setTogether(family, on) {
    together[family] = on;
    document
      .querySelectorAll("[data-mlv-together='" + family + "']")
      .forEach(function (button) {
        button.classList.toggle("is-active", on);
        button.setAttribute("aria-pressed", on ? "true" : "false");
      });
  }

  // ---------------------------------------------------------------- setup
  function makeDrag(p) {
    var isBinary = p.spec.family === "binary";
    var family = p.spec.family;

    // Group moves are read off a snapshot taken at drag start, so the shift is
    // always measured from where the sample was when the gesture began.
    function grab(d) {
      if (isBinary) {
        p.groupBase = binary.map(function (o) {
          return logit(o.p);
        });
        p.groupAnchor = logit(d.p);
      } else {
        p.groupBase = regression.map(function (o) {
          return o.y;
        });
        p.groupAnchor = d.y;
      }
    }

    function shift(event) {
      if (isBinary) {
        var dz = logit(clamp(p.x.invert(event.x), 0, 1)) - p.groupAnchor;
        binary.forEach(function (o, i) {
          o.p = sigmoid(p.groupBase[i] + dz);
        });
      } else {
        var dy = p.y.invert(event.y) - p.groupAnchor;
        // Clamp the shift, not the points: clipping individually would squash
        // the sample against the axis and change its ordering.
        dy = clamp(
          dy,
          regDomain[0] - d3.min(p.groupBase),
          regDomain[1] - d3.max(p.groupBase)
        );
        regression.forEach(function (o, i) {
          o.y = p.groupBase[i] + dy;
        });
      }
    }

    return d3
      .drag()
      .subject(function (event, d) {
        return {
          x: p.x(isBinary ? d.p : d.x),
          y: p.y(isBinary ? d.jitter : d.y)
        };
      })
      .on("start", function (event, d) {
        d3.select(this).classed("is-dragging", true);
        if (together[family]) grab(d);
      })
      .on("drag", function (event, d) {
        if (together[family] && p.groupBase) {
          shift(event);
        } else if (isBinary) {
          d.p = clamp(p.x.invert(event.x), 0, 1);
        } else {
          d.y = clamp(p.y.invert(event.y), regDomain[0], regDomain[1]);
        }
        recompute();
        queueFamily(family);
      })
      .on("end", function () {
        d3.select(this).classed("is-dragging", false);
        p.groupBase = null;
      });
  }

  function initPanel(fig) {
    var spec = SPEC[fig.dataset.mlv];
    if (!spec) return;

    var caption = fig.querySelector("figcaption");

    var head = document.createElement("div");
    head.className = "mlv-readout";
    var label = document.createElement("span");
    label.className = "mlv-readout__label";
    label.textContent = spec.label;
    var value = document.createElement("span");
    value.className = "mlv-readout__value";
    value.textContent = "—";
    head.appendChild(label);
    head.appendChild(value);

    var plot = document.createElement("div");
    plot.className = "mlv-plot";

    if (caption) {
      fig.insertBefore(head, caption);
      fig.insertBefore(plot, caption);
    } else {
      fig.appendChild(head);
      fig.appendChild(plot);
    }

    var svg = d3
      .select(plot)
      .append("svg")
      .attr("class", "mlv-svg")
      .attr("role", "img")
      .attr("aria-label", spec.label + " visualisation");

    var root = svg.append("g");

    var p = {
      spec: spec,
      fig: fig,
      plot: plot,
      svg: svg,
      root: root,
      value: value,
      small: !!fig.closest(".mlv-trio"),
      x: d3.scaleLinear(),
      y: d3.scaleLinear()
    };

    p.diag = root.append("line").attr("class", "mlv-diag");
    p.rules = root.append("g");
    p.errorLayer = root.append("g").attr("class", "mlv-errors");
    p.axisX = root.append("g").attr("class", "mlv-axis mlv-axis--x");
    p.axisY = root.append("g").attr("class", "mlv-axis mlv-axis--y");
    p.labelX = root.append("text").attr("class", "mlv-axis-label").attr("text-anchor", "middle");
    p.labelY = root
      .append("text")
      .attr("class", "mlv-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)");
    p.pointLayer = root.append("g").attr("class", "mlv-points");
    p.drag = makeDrag(p);

    panels.push(p);
    byPlotNode.set(plot, p);
  }

  function init() {
    var figures = document.querySelectorAll("[data-mlv]");
    if (!figures.length) return;

    Array.prototype.forEach.call(figures, initPanel);
    if (!panels.length) return;

    makeRegression();
    makeBinary();
    recompute();

    document.querySelectorAll("[data-mlv-new]").forEach(function (button) {
      button.addEventListener("click", function () {
        var family = button.dataset.mlvNew === "binary" ? "binary" : "regression";
        if (family === "binary") {
          makeBinary();
        } else {
          makeRegression();
        }
        recompute();
        queueFamily(family);
      });
    });

    document.querySelectorAll("[data-mlv-perfect]").forEach(function (button) {
      button.addEventListener("click", function () {
        var family = button.dataset.mlvPerfect === "binary" ? "binary" : "regression";
        makePerfect(family);
        recompute();
        queueFamily(family);
      });
    });

    document.querySelectorAll("[data-mlv-together]").forEach(function (button) {
      button.addEventListener("click", function () {
        var family = button.dataset.mlvTogether === "binary" ? "binary" : "regression";
        setTogether(family, !together[family]);
      });
    });

    if (typeof ResizeObserver === "function") {
      var ro = new ResizeObserver(function (entries) {
        var dirty = false;
        entries.forEach(function (entry) {
          var p = byPlotNode.get(entry.target);
          var w = Math.floor(entry.contentRect.width);
          if (p && w !== p.lastWidth) {
            p.lastWidth = w;
            pending.add(p);
            dirty = true;
          }
        });
        if (dirty) scheduleFrame();
      });
      panels.forEach(function (p) {
        ro.observe(p.plot);
      });
    } else {
      window.addEventListener("resize", queueAll);
    }

    queueAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
