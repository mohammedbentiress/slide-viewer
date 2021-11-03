const { watch } = require("fs");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/index.html",
  filename: "./index.html"
});
module.exports = (env, argv) => {
  console.log(argv.mode);
  return {
    entry: "./client/index.tsx",
    output: {
      path: path.join(__dirname, 'dist'),
      filename: "bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    devtool: 'eval-source-map',
    watch: false,
    plugins: [
        htmlPlugin,
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        ],
    module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "ts-loader",
            },
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: "file-loader",
            options: { 
              name: '/static/[name].[ext]',
               fix: true
              }
          },
          {
            test: /\.css$/i,
            include: path.resolve(__dirname, 'client'),
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          }
        ],
    },
  };
};