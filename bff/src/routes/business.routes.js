const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const proxyService = require('../services/proxy.service');
const servicesConfig = require('../config/services.config');
const ResponseUtil = require('../utils/response.util');

const router = express.Router();

// All business routes require authentication
router.use(authenticate);

// Wildcard route to forward all business requests
router.all('/*', async (req, res) => {
  try {
    const path = `/api/checklist${req.params[0] ? '/' + req.params[0] : ''}`;
    
    // Forward the request with authentication headers
    const result = await proxyService.forwardRequest(
      servicesConfig.business.baseUrl,
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
    console.error('Business route error:', error);
    return ResponseUtil.error(res, 'Failed to process business request');
  }
});

module.exports = router;