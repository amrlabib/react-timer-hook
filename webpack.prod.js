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
                { from: './src/index.d.ts', to: './' },
                ],
        }),
    ],
    externals: [
      'react',
      /^react\/.+$/,
    ],
}