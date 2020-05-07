
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/react', '@babel/env']
        }
    }
};

const css = {
    test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
    ],
};

const serverConfig = {
    mode: 'development',
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()],
    entry: {
        'index.js': path.resolve(__dirname, 'src/server/index.js')
    },
    module: {
        rules: [
            js,
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: "inline-source-map"
};

const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: {
        'client.js': path.resolve(__dirname, 'src/client/index.js')
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            js,
            css
        ]

    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: 'bundle.js'
    },
    devtool: "inline-source-map"
};

module.exports = [serverConfig, clientConfig];