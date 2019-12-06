const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  output: {
    path: path.resolve(__dirname + "/dist/")
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract({
              use: ["css-loader!postcss-loader", "sass-loader"],
              fallback: "vue-style-loader"
            })
          },
          extractCSS: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("style.min.css"),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + "/src/plugin.js"),
    output: {
      filename: "vuejs-video-player.min.js",
      libraryTarget: "window",
      library: "VueVideoPlayer"
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + "/src/components/VideoPlayer.vue"),
    output: {
      filename: "vuejs-video-player.js",
      libraryTarget: "umd",
      library: "VueVideoPlayer",
      umdNamedDefine: true
    }
  })
];
