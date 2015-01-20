module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ],
  }
};