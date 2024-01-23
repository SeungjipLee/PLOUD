const path = require("path");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

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
        // options: {
          // presets: [
            // [
            //   "@babel/preset-env",
            //   {
            //     targets: { browsers: ["last 2 chrome versions"] },
            //     // debug: true,
            //   },
            // ],
          //   "@babel/preset-react",
          // ],
          // plugins: ["react-refresh/babel"], // 추가
        // },
        // exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  // plugins: [new ReactRefreshWebpackPlugin()], // 플러그인 장착
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  // devServer: {
  //   devMiddleware: { publicPath: "/dist" }, // 웹팩을 생성해주는 경로
  //   static: { directory: path.resolve(__dirname) },// 실제로 존재하는 정적 파일들의 경로
  //   hot: true,
  // },
  devServer: {
    static: path.resolve(__dirname, "public"),
    port: process.env.PORT,
    historyApiFallback: true,
    // 404 NOT FOUND 시 index.html 을 렌더링해서 보여줌
  },
};