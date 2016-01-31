var webpack = require('webpack');
var path = require('path');
var svgoConfig = JSON.stringify({
    plugins: [
        {removeTitle: true},
        {convertColors: {shorthex: false}},
        {convertPathData: false}
    ]
});

var ENV = "development";
//var ENV = "production";

module.exports = {
    entry: path.join(__dirname, "./src/js/app/app.js"),
    output: {
        path: path.join(__dirname, "/build/"),
        filename: "app.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(svg|woff)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({}),
        new webpack.DefinePlugin({
            '__DEV__': JSON.stringify(ENV == 'development')
        })
    ]
};