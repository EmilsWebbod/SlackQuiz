const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const fs = require('fs');
const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './lib/server.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'server.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    // All files with a '.ts' or '.tsx'
    // extension will be handled by 'ts-loader'
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      }
    ]
  },
  target: 'node',
  externals: nodeModules
};
