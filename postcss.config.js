const tailwindcss = require("tailwindcss");
const isDev = process.env.NODE_ENV === "development";

const plugins = [tailwindcss("./tailwind.config.js")];

if (!isDev) {
  const purgecss = require("@fullhuman/postcss-purgecss");
  const cssnano = require("cssnano");
  const autoprefixer = require("autoprefixer");

  [].push.apply(plugins, [
    autoprefixer,
    purgecss({
      content: ["src/**/*.njk", "src/**/*.md", "src/**/*.js"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
    cssnano({
      preset: "default",
    }),
  ]);
}

module.exports = { plugins };
