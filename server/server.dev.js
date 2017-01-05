import express from 'express';
import webpack from 'webpack';
import config from '../webpack/webpack.dev.config';
import path from 'path'
import fs from 'fs'
const app = express();

// webpack compile
const compiler = webpack(config);
const options = {
  publicPath: config.output.publicPath,
  noInfo: true,
  hot: true,
  watchOptions: {
    ignored: /node_modules/
  },
  index: "../src/index.html",
  stats: {
    colors: true
  },
};

// Webpack hook event to write html file into /server/views due to server render
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

app.use(require('webpack-dev-middleware')(compiler, options));
app.use(require('webpack-hot-middleware')(compiler));



//app.use(require('./ssrMiddleware'));
app.disable('x-powered-by');

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../views/dev', 'index.html'))
})

const server = app.listen(8989, () => {
  const {
    port
  } = server.address();
  console.info(`Listened at http://localhost:${port}`);
});
