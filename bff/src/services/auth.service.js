const HttpClient = require('../utils/http-client');
const servicesConfig = require('../config/services.config');

class AuthService {
  constructor() {
    this.client = new HttpClient(
      servicesConfig.auth.baseUrl,
      servicesConfig.auth.timeout
    );
  }

  async validateToken(token) {
    try {
      const response = await this.client.post(
        servicesConfig.auth.endpoints.validateToken,
        { token }
      );
      return {
        isValid: true,
        data: response.data
      };
    } catch (error) {
      console.error('Token validation failed:', error.message);
      return {
        isValid: false,
        error: error.response?.data || { message: 'Token validation failed' }
      };
    }
  }
}

module.exports = new AuthService();