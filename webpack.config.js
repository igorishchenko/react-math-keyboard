const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry:
      argv.mode === "development" ? "./examples/home.tsx" : "./src/index.tsx", // Simplified entry for production
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "react-math-keyboard.js",
      library: "react-math-keyboard",
      libraryTarget: "umd",
      umdNamedDefine: true,
      globalObject: `typeof self !== 'undefined' ? self : this`,
      publicPath: "",
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      },
    },
    devServer: {
      static: path.join(__dirname, "src"),
      hot: true, // Enable hot reloading
    },
    externals:
      argv.mode !== "development"
        ? {
            react: {
              commonjs: "react",
              commonjs2: "react",
              amd: "react",
              root: "React", // Ensure the correct casing here
            },
            "react-dom": {
              commonjs: "react-dom",
              commonjs2: "react-dom",
              amd: "ReactDOM",
              root: "ReactDOM", // Ensure the correct casing here
            },
          }
        : {},
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ttf|eot|woff|woff2|otf|svg)$/,
          loader: "file-loader",
          options: {
            name: "font/[name].[ext]",
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /mathquill\.css$/,
          loader: "string-replace-loader",
          options: {
            search: "@font-face {(.|\n)+?}",
            replace:
              "@font-face {\n" +
              "  /* Heavy fonts have been removed */\n" +
              "  font-family: Symbola;\n" +
              "}",
            flags: "g",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
    ],
  };
};
