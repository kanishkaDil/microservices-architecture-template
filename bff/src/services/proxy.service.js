const HttpClient = require('../utils/http-client');

class ProxyService {
  constructor() {
    this.clients = new Map();
  }

  getClient(serviceUrl, timeout = 15000) {
    if (!this.clients.has(serviceUrl)) {
      this.clients.set(serviceUrl, new HttpClient(serviceUrl, timeout));
    }
    return this.clients.get(serviceUrl);
  }

  async forwardRequest(serviceUrl, path, method, data = null, headers = {}) {
    const client = this.getClient(serviceUrl);
    
    const config = {
      headers: this.sanitizeHeaders(headers)
    };

    try {
      let response;
      const fullPath = path.startsWith('/') ? path : `/${path}`;

      switch (method.toUpperCase()) {
        case 'GET':
          response = await client.get(fullPath, config);
          break;
        case 'POST':
          response = await client.post(fullPath, data, config);
          break;
        case 'PUT':
          response = await client.put(fullPath, data, config);
          break;
        case 'PATCH':
          response = await client.patch(fullPath, data, config);
          break;
        case 'DELETE':
          response = await client.delete(fullPath, config);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || { message: error.message },
        status: error.response?.status || 500
      };
    }
  }

  sanitizeHeaders(headers) {
    const sanitized = { ...headers };
    // Remove headers that shouldn't be forwarded
    delete sanitized.host;
    delete sanitized.connection;
    delete sanitized['content-length'];
    return sanitized;
  }
}

module.exports = new ProxyService();