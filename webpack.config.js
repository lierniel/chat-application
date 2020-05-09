
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const fileName = ext => `bundle.${isProd ? '.[hash]':''}.${ext}`;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config;
};

const jsLoader = (babelPreset) => {
    const config = {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env']
            }
        }
    };
    if (babelPreset){
        config.loader.options.presets.push(babelPreset)
    }

    return config
};

const css = {
    test: /\.css$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            }
        },
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
            jsLoader(),
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: "inline-source-map",
};

const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: {
        'client.js': path.resolve(__dirname, 'src/client/index.js')
    },
    optimization: optimization() ,
    plugins: [
        new MiniCssExtractPlugin({
            filename: fileName('css')
        }),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/client/index.html'),
            minify: {
                collapseWhitespace: isProd
            }
        })
    ],
    module: {
        rules: [
            jsLoader('@babel/preset-react'),
            css,
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: `${isProd ? '[hash]' : '[name]'}.[ext]`
                        }
                    },
                ],
            },
        ]

    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: fileName('js'),
        publicPath: '/static/'
    },
    devtool: "inline-source-map",
};

module.exports = [serverConfig, clientConfig];