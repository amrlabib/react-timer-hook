const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    performance: {
      hints: false
    },
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: './index.js',
        library: 'react-timer-hook',
        libraryTarget: "umd",
        globalObject: 'typeof self !== \'undefined\' ? self : this',
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
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/index.d.ts', to: './' },
        ]),
    ],
    externals: [
      'react',
      /^react\/.+$/,
    ],
}