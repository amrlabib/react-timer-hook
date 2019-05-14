const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    performance: {
      hints: false
    },
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'js/scripts.js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dev-dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['env', 'es2015', 'react', 'stage-1'],
            }
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html', to: './' },
        ]),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dev-dist'),
      compress: true,
      port: 9000
    }
}