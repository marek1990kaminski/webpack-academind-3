let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

let extractPlugin = new ExtractTextPlugin({
    filename: 'main.scss'
});

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        //publicPath: "/dist"
        // it was needed, when we didnt have the HTML file in dist
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            //publicPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'src/index.html')
            }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        extractPlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        /* new HtmlWebpackPlugin({
             filename: 'users.html',
             template: 'src/users.html',
             chunks: ['app']
         }),*/
        new CleanWebpackPlugin(['dist'])
    ]
};