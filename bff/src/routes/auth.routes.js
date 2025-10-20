const express = require('express');
const proxyService = require('../services/proxy.service');
const servicesConfig = require('../config/services.config');
const ResponseUtil = require('../utils/response.util');

const router = express.Router();

// Auth routes - no token validation required
// Wildcard route to forward all auth requests
router.all('/*', async (req, res) => {
  try {
    const path = `/api/auth${req.params[0] ? '/' + req.params[0] : ''}`;
    
    const result = await proxyService.forwardRequest(
      servicesConfig.auth.baseUrl,
      path,
      req.method,
      req.body,
      req.headers
    );

    if (result.success) {
      return res.status(result.status).json(result.data);
    } else {
      return res.status(result.status).json(result.error);
    }
  } catch (error) {
    console.error('Auth route error:', error);
    return ResponseUtil.error(res, 'Failed to process auth request');
  }
});

module.exports = router;