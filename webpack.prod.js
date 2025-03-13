module.exports = {
    performance: {
      hints: false
    },
    mode: "production",
    entry: './src/index.ts',
    output: {
        filename: './index.js',
        library: 'react-timer-hook',
        libraryTarget: "umd",
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
          {
            test: /\.ts?$/,
            use: {
              loader: 'ts-loader',
            },
            exclude: /node_modules/
          },
        ]
    },
    externals: [
      'react',
      /^react\/.+$/,
    ],
}