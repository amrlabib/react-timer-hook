const path = require('path')


module.exports = {
    performance: {
      hints: false
    },
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: './index.js',
        // chunkFilename: '[name].[chunkhash].js',
        // path: path.resolve(__dirname, 'dist'),
        library: 'react-timer-hook',
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js$/,
            // exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['env', 'es2015', 'react', 'stage-1'],
            }
        }]
    },
    externals: [
      'react',
      // Everything that starts with "library/"
      /^react\/.+$/,
    ],
}