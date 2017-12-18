const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer')

const BUILD_NAME = './js/build.js';

const config = {
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./public'),
        filename: BUILD_NAME,
        publicPath: '/'
    },
    devtool: 'source-map',
    watchOptions: { //задержка реакции чтобы исключить баги при задержке индексации файлов
        aggregateTimeout: 200
    },
    resolve: {
        modules: ['node_modules', 'src', 'src/style'], // Директории в которых будут скать скрипты если не указан путь
        extensions: ['.js', '.scss', '.css'], // разширения которые можно не дописывать при импорте
    },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(gif|png|ttf|svg|woff|eot)$/,
                    exclude: /node_modules/,
                    use: ['file-loader']
                }
            ]
        },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: [autoprefixer('last 2 versions', 'ie 10')],
                 sassLoader: {
                 data: '@import "./public/style/global-config.scss";'
                 }
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/templates/dev_index.ejs',
            build: BUILD_NAME,
            inject: false,
            hash: true
        })
    ]
};

config.module.rules.push({
    test: /\.(scss|css)$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
            data: '@import "./public/style/global-config.scss";'
        }
    }]
})

module.exports = config;