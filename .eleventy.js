module.exports = (config) => {
  const isDev = process.env.NODE_ENV === "development";

  // config.setBrowserSyncConfig({
  //   files: [
  //     {
  //       match: ["./src/js/**/*.js"],
  //       fn: function () {
  //         this.reload();
  //       },
  //     },
  //   ],
  // });

  // Copy static files directly to output.
  config.addPassthroughCopy({ "src/static": "/static/" });

  // Reload the page every time any JS/CSS files change.
  //   eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  config.addShortcode("bundledCss", function () {
    return !isDev ? `<link href="./assets/main.css" rel="stylesheet" />` : "";
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      //   includes: 'includes',
      //   layouts: 'layouts',
      data: "data",
    },
    passthroughFileCopy: true,
  };
};
