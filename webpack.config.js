const path = require("path");
const WebpackHtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "public", "js", "main.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new WebpackHtmlPlugin({
      template: path.join(__dirname, "src", "public", "index.html")
    })
  ]
};
