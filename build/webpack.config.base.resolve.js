const path = require('path');

module.exports = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
    wux: path.resolve(__dirname, './../src/miniprogram/wux')
  }
};
