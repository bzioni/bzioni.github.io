const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

const devPlugins = [
  // new HtmlWebpackPlugin({
  //   template: path.resolve(__dirname, "src/index.html"),
  //   filename: path.resolve(__dirname, "src/index.njk"),
  //   // Hash is used for cache busting the generated webpack.html
  //   // while keeping the same file name in the output
  //   hash: true,
  //   inject: false,
  // }),
];
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
      path: path.resolve(__dirname, "dist", "assets"),
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
    // devServer: {
    //   contentBase: path.join(__dirname, "public"),
    //   // hot: true,
    // },
  };
};
