const authService = require('../services/auth.service');
const ApiResponse = require('../utils/response.util');

class AuthController {
  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      return ApiResponse.success(res, result.data, 'Login successful');
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({
          success: false,
          message: error.response.data?.message || 'Login failed',
          timestamp: new Date().toISOString()
        });
      }
      next(error);
    }
  }
}

module.exports = new AuthController();