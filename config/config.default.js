'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1514389980425_2354';

  // add your config here
  config.middleware = [];

  config.ipfs = {
    host: 'localhost',
    port: '25001',
    protocol: 'http',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST,PUT',
  };

  return config;
};
