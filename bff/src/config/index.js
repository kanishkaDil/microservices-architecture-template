require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  
  services: {
    auth: {
      baseUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3000',
      validateEndpoint: process.env.AUTH_VALIDATE_ENDPOINT || '/api/auth/validate-token'
    },
    business: {
      baseUrl: process.env.BUSINESS_SERVICE_URL || 'http://localhost:3001'
    }
  }
};

module.exports = config;