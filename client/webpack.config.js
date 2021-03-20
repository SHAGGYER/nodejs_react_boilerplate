const path = require("path");
const DotEnv = require("dotenv-webpack");

module.exports = {
  entry: {
    public: "./src/index.jsx",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      "@components": path.resolve(__dirname, "./src/Components"),
      "@hooks": path.resolve(__dirname, "./src/Hooks"),
      "@services": path.resolve(__dirname, "./src/Services"),
    },
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  plugins: [new DotEnv()],
};
