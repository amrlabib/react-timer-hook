const path = require('path')


module.exports = {
    performance: {
      hints: false
    },
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: './index.js',
        library: 'react-timer-hook',
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['env', 'es2015', 'react', 'stage-1'],
            }
        }]
    },
    externals: [
      'react',
      /^react\/.+$/,
    ],
}