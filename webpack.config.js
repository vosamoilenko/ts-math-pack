const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts',
  },
  target: 'node',
  context: path.resolve(__dirname),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'math',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],
  devtool: 'source-map',
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
}
