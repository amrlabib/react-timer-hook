const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")


module.exports = {
    performance: {
      hints: false
    },
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: 'js/scripts.js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
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
            { from: './src/useTimer.js', to: './index.js' }
        ]),
        new CompressionPlugin({
          test: /\.js/m,
        }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
}
