const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['data'] = path.join(__dirname, 'data')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['styles'] = path.join(__dirname, 'styles')
    return config
  }
}
