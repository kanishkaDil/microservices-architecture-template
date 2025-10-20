const proxyService = require('../services/proxy.service');
const logger = require('../utils/logger.util');

class ProxyController {
  async handleRequest(serviceName) {
    return async (req, res, next) => {
      try {
        const path = req.params[0] || '';
        const method = req.method;
        const data = req.body;
        const headers = req.headers;
        const query = req.query;

        logger.info(`Proxying ${method} /${serviceName}/${path}`);

        const result = await proxyService.forwardRequest(
          serviceName,
          `/${path}`,
          method,
          data,
          headers,
          query
        );

        // Forward response headers
        if (result.headers) {
          Object.entries(result.headers).forEach(([key, value]) => {
            if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
              res.setHeader(key, value);
            }
          });
        }

        return res.status(result.status).json(result.data);
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = new ProxyController();