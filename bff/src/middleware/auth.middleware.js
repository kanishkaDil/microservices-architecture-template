const authService = require('../services/auth.service');
const ResponseUtil = require('../utils/response.util');

const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return ResponseUtil.unauthorized(res, 'No authorization token provided');
    }

    // Extract token (support both "Bearer token" and "token" formats)
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return ResponseUtil.unauthorized(res, 'Invalid authorization format');
    }

    // Validate token with auth service
    const validation = await authService.validateToken(token);

    if (!validation.isValid) {
      return ResponseUtil.unauthorized(
        res,
        validation.error.message || 'Invalid or expired token'
      );
    }

    // Attach user data to request object
    req.user = validation.data.user || validation.data;
    req.token = token;

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return ResponseUtil.error(res, 'Authentication failed', 500);
  }
};

// Optional authentication - doesn't fail if token is missing
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : authHeader;

      if (token) {
        const validation = await authService.validateToken(token);
        if (validation.isValid) {
          req.user = validation.data.user || validation.data;
          req.token = token;
        }
      }
    }
    
    next();
  } catch (error) {
    // Don't block the request on optional auth
    next();
  }
};

module.exports = { authenticate, optionalAuth };