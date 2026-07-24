import markdownItFootnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginTOC from "eleventy-plugin-toc";
import markdownIt from "markdown-it";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapper: "div",
    wrapperClass: "toc",
  });

  const md = markdownIt({ html: true, breaks: false, linkify: true })
    .use(markdownItFootnote)
    .use(markdownItAnchor);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/libs": "libs" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy(".well-known");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.png");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/blog/**/*.svg");

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob(["src/blog/**/*.md", "src/blog/**/*.njk"]).sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("publications", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/publications/*.md").sort((a, b) => b.date - a.date)
  );

  function tagSlug(tag) {
    return tag
      .toString()
      .trim()
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  eleventyConfig.addFilter("tagSlug", tagSlug);

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const bySlug = new Map();
    for (const item of [
      ...collectionApi.getFilteredByGlob(["src/blog/**/*.md", "src/blog/**/*.njk"]),
      ...collectionApi.getFilteredByGlob("src/publications/*.md"),
    ]) {
      (item.data.tags || []).forEach((tag) => {
        if (!tag || !tag.trim()) return;
        const slug = tagSlug(tag);
        if (!bySlug.has(slug)) bySlug.set(slug, tag);
      });
    }
    return [...bySlug.values()].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addFilter("byTag", (items, tag) => {
    const slug = tagSlug(tag);
    return items.filter((item) => (item.data.tags || []).some((t) => t && tagSlug(t) === slug));
  });

  eleventyConfig.addFilter("year", (date) => new Date(date).getUTCFullYear());

  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  eleventyConfig.addFilter("readableDate", (date) => {
    const d = new Date(date);
    return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("htmlDateString", (date) => new Date(date).toISOString().slice(0, 10));

  eleventyConfig.addFilter("groupByYear", (items) => {
    const groups = [];
    let currentYear = null;
    for (const item of items) {
      const y = item.date.getUTCFullYear();
      if (y !== currentYear) {
        groups.push([y, []]);
        currentYear = y;
      }
      groups[groups.length - 1][1].push(item);
    }
    return groups;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
