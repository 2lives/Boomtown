const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //makes it so we dsont have to go to dist folder
//got this from webpack main site
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  plugins: [new HtmlWebpackPlugin()]
};
