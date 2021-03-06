module.exports = (config) => {
  const isDev = process.env.NODE_ENV === "development";

  // Copy static files directly to output.
  config.addPassthroughCopy({ "src/static": "/static/" });

  config.addShortcode("bundledCss", function () {
    return !isDev ? `<link href="./assets/main.css" rel="stylesheet" />` : "";
  });

  config.setBrowserSyncConfig({
    files: [
      {
        match: ["./docs/assets/**/*"],
        fn: function () {
          this.reload();
        },
      },
    ],
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      //   includes: 'includes',
      //   layouts: 'layouts',
      data: "data",
    },
    passthroughFileCopy: true,
  };
};
