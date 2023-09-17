const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    // devServer: {
    //     contentBase: path.resolve(__dirname, './src'),
    //     historyApiFallback: true
    // },
    entry: {
        mainPage: path.resolve(__dirname, "./src/main.ts"),
        popup: path.resolve(__dirname, "./src/popup.ts"),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '云开诗词新标签页',
            filename: 'mainPage.html',
            template: './src/index.html',
            chunks: ['mainPage']
        }),
        new HtmlWebpackPlugin({
            title: '云开诗词新标签页弹窗',
            filename: 'popup.html',
            template: './src/popup.html',
            chunks: ['popup']
        }),
        new CleanWebpackPlugin()
    ]
}

