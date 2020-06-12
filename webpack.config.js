const webpack = require('webpack');
const path = require('path');
const WebpackHtmlPlugin = require('html-webpack-plugin') ;
const MiniCssPlugin = require('mini-css-extract-plugin')

const config = {
    entry:'./index.ts',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    resolve:{
        extensions:['.ts','.js']
    },
    devServer:{
        contentBase:'./dist',
        historyApiFallback:true,
    },
    module:{
        rules:[{
            test:/\.ts$/,
            use:['ts-loader']
        }, 
        {
                test: /\.html$/i,
            loader: 'html-loader', 
            options: {
                // Disables attributes processing
                attributes: false,
            },
            },
        {
            test:/\.css$/,
            use: [MiniCssPlugin.loader,'css-loader']
        }
    ]
    },
    plugins:[
        new WebpackHtmlPlugin({
            filename:'index.html',
            template:'./src/pages/Login/index.html'
        }),
        // new WebpackHtmlPlugin({
        //     filename: 'page.html',
        //     template: './src/pages/PageLayout/pageLayout.html'
        // }),
        new MiniCssPlugin()
    ]
}

module.exports = config