const path = require('path')
module.exports = {
	performance: {
      hints: false
    },
    mode: "development",
    entry: './demo/index.tsx',
    output: {
        filename: 'index.js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs'),
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
            exclude: /node_modules/
          },
        ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'docs')
      },
      compress: true,
      port: 9000,
    }
}