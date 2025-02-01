const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ],
        },
        devServer: {
            static: './public',
        },
        mode: argv.mode || 'development',
        devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: isProduction // Удаляем console.log только в production
                        }
                    }
                })
            ]
        },
        plugins: [
            // ...(isProduction ? [new CleanWebpackPlugin()] : [])
        ]
    };
};