require('babel-register');
var lessParser = require('postcss-less').parse;
//https://github.com/css-modules/css-modules-require-hook
require('css-modules-require-hook')({
  extensions: ['.less'],
  processorOpts: {
    parser: lessParser
  },
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});




// Image require hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8000
})

require('./server.dev');
