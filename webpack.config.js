var HtmlWebpackPlugin = require('html-webpack-plugin');

require("babel-polyfill");

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            // apiUrl: 'http://161.35.150.211:4000' // devServer ip
            apiUrl: 'http://localhost:4000'
        })
    },
    entry: ["babel-polyfill", "./src/index.js"]
}


