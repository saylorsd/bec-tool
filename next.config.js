const path = require('path');

module.exports = {
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }

    config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config
  },
}