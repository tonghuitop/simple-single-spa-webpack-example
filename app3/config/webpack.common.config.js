const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: 'http://localhost:8083',
    filename: 'js/[name].js',
    library: {
      name: 'app3',
      type: 'var', // 当 library 加载完成，入口起点的返回值将分配给一个变量：
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里
          'css-loader' // css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'public/index.html',
    inject: 'body',
    minify: {// 压缩HTML文件
      removeComments: true,//去除注释
      collapseWhitespace: true,//去除空格
    },
  })],
}