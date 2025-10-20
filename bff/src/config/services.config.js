const config = require('./index');

const servicesConfig = {
  auth: {
    baseUrl: config.services.auth.baseUrl,
    timeout: 10000,
    endpoints: {
      validateToken: config.services.auth.validateEndpoint,
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      refresh: '/api/auth/refresh'
    }
  },
  business: {
    baseUrl: config.services.business.baseUrl,
    timeout: 15000,
    requiresAuth: true
  }
};

module.exports = servicesConfig;