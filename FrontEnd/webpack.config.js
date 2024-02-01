const path = require("path");

module.exports = {
  mode: 'development', // 배포 : production
  devtool: "source-map", // hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // main.js를 대상으로 웹팩이 빌드를 수행
  entry: {
    main: ["./src/main.js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: [
            "@babel/preset-env",
            ["@babel/preset-react", {"runtime": "automatic"}]
          ] },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "public"),
    port: process.env.PORT,
    historyApiFallback: true,
    // 404 NOT FOUND 시 index.html 을 렌더링해서 보여줌
  },
};