const webpack = require('webpack');

/** @type {import('next').NextConfig} */

// Проблема в том, что я не понимаю как настроить AWS Amplify чтобы секретной инфы не было на клиенте
// А в том, как я сделал сейчас, я не понимал как обновить токен, ибо инициализируется Auth в routes

const nextConfig = {
  // https://github.com/aws-amplify/amplify-js/issues/11030
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === 'nodejs') config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ }));
    return config;
  }
};

module.exports = nextConfig;
