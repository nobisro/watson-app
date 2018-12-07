const path = require("path");
require("@babel/polyfill");
require("regenerator-runtime/runtime");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", __dirname + "/client/App.jsx"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: [/\.js?$/, /\.jsx?$/],
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        },
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    port: 3030
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
