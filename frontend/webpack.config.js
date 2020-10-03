const webpack = require("webpack");
module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "es2015", "stage-1"],
        },
      },
    ],
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object"),
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};
