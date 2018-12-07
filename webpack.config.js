const path = require("path");

module.exports = {
  mode: "development",
  entry: __dirname + "/client/App.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
  }
};
