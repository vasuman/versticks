module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/build' ,
        filename: 'main.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        }],
    }
};
