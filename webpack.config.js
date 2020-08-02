const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devPlugins = [];
const prdPlugins = [
  new MiniCssExtractPlugin({
    filename: "main.css",
  }),
];

module.exports = (env, argv) => {
  let isDev = argv.mode === "development";
  let mode = isDev ? "development" : "production";

  return {
    mode: mode,
    //     entry: [
    //   path.resolve(__dirname, 'src', 'assets', 'js', 'index.js'),
    //   path.resolve(__dirname, 'src', 'assets', 'css', 'index.css'),
    // ],
    entry: {
      body: "./src/js/body.js",
      head: "./src/js/head.js",
    },
    output: {
      path: path.resolve(__dirname, "docs", "assets"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [],
              },
            },
          ],
        },
        {
          test: /\.scss$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { url: false, sourceMap: true } },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },

    plugins: isDev ? devPlugins : prdPlugins,
  };
};
