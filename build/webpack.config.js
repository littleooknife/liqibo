const path = require('path');
const extractCssPlugin = require('extract-text-webpack-plugin');
const htmlTemplatePlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname,'../');
const BUILD_PATH = path.resolve(ROOT_PATH,'public');
const SRC_PATH = path.resolve(ROOT_PATH,'src');
const extractCss = new extractCssPlugin('css/[name].css',{allChunks:true});

module.exports={
    mode:'development',
    devtool:'eval-source-map',
    entry:{
        app:path.resolve(SRC_PATH,'app.js')
    },
    output:{
        filename:'js/[name].js',
        path:path.resolve(BUILD_PATH),
    },
    plugins:[
        extractCss,
        new htmlTemplatePlugin({
            filename: path.resolve(ROOT_PATH, 'public', 'index.html'),
            template: path.resolve(ROOT_PATH, 'html', 'index.html'),
        })
    ],
    watch:true,
    watchOptions:{
        aggregateTimeout:500,
        ignored:/node_modules/,
        poll:1000
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loaders:['babel-loader'],
                include: SRC_PATH,
                exclude: path.resolve(ROOT_PATH,'node_modules')
            },{
                test: /\.(png|jpe?g|gif)$/,
                use: ['url-loader?limit=10240&name=img/[hash:8].[name].[ext]']
            },
            {
                test:/\.css$/,
                loader: extractCss.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                        'postcss-loader'
                    ],
                    publicPath:path.resolve(BUILD_PATH, 'css')
                })
            }
        ]
    }
}