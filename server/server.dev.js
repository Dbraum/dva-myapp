import express from 'express';
import webpack from 'webpack';
import httpProxy from "http-proxy";
import config from '../webpack/webpack.dev.config';
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
const app = express();
const apiProxy = httpProxy.createProxyServer();

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
  }
};

// Webpack hook event to write html file into /server/views due to server render
compiler.plugin('emit', (compilation, callback) => {
  const assets = compilation.assets
  let file,
    data

  Object
    .keys(assets)
    .forEach(key => {
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//mock
var Mock = require('mockjs')
app.get('/api/dashboard', function(req, res) {
  const template = require('../mock/dashboard');
  res.json(Mock.mock(template));
})

app.use('/api/users', require('./routes/users'));

// Proxy api requests
// app.use("/api/*", function (req, res) {
//   req.url = req.baseUrl; // Janky hack...
//   apiProxy.web(req, res, {
//     target: {
//       port: 9090,
//       host: "localhost"
//     }
//   });
// });

//app.use(require('./ssrMiddleware'));
app.disable('x-powered-by');

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../views/dev', 'index.html'))
})

const server = app.listen(8989, () => {
  const {port} = server.address();
  console.info(`Listened at http://localhost:${port}`);
});
