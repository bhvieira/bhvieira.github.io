@def rss_pubdate = Date(2026, 03, 03)
@def rss = "ML Model Performance Visualizer — interactive tool for exploring regression and classification metrics."
@def title = "ML Model Performance Visualizer"
@def tags = ["machine learning", "statistics", "visualization", "metrics"]

{{blogdetails .}}

Data is randomly generated to demonstrate various regression and classification metrics. **Try dragging the points!**

{{insert mlvisualizer.html }}

## Regression Metrics

- **Mean Absolute Error (MAE)**: average lengths of the residual segments
- **Mean Squared Error (MSE)**: average area of the squares formed by the residuals
- **Concordance Index (C-index)**: the agreement in the ordering of predicted and actual values

## Classification Metrics (i.e., for binary outcomes 0/1)

- **Brier Score**: average squared difference between predicted probabilities and actual outcomes
- **Mean Calibration Error (MCE)**: the average squared difference between predicted probabilities and observed frequencies across bins
- **Area Under the ROC Curve (AUC)**: the agreement in the ordering of predicted probabilities for positive and negative classes
