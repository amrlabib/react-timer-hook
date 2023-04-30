const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    performance: {
      hints: false
    },
    mode: "development",
    entry: './demo/index.js',
    output: {
        filename: 'index.js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs'),
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }],
                  ['@babel/preset-typescript', { allowNamespaces: true }]
                ]
              }
            }
        }]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "./demo/index.html", to: "./" },
                ],
        }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'docs')
      },
      compress: true,
      port: 9000,
    }
}