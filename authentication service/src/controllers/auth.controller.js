const authService = require('../services/auth.service');
const { LoginDto, UserResponseDto } = require('../dto/auth.dto');

class AuthController {
  async login(req, res) {
    try {
      const loginDto = new LoginDto(req.body.email, req.body.password);
      
      const errors = loginDto.validate();
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const authResponse = await authService.login(loginDto);
      
      res.cookie('token', authResponse.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000 // 1 hour
      });

      return res.status(200).json({
        message: 'Login successful',
        data: authResponse
      });
    } catch (error) {
      return res.status(401).json({ 
        message: error.message 
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie('token');
      return res.status(200).json({ 
        message: 'Logout successful' 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Logout failed' 
      });
    }
  }

  async getProfile(req, res) {
    try {
      const user = authService.getUserById(req.user.id);
      const userResponse = new UserResponseDto(user);
      
      return res.status(200).json({
        message: 'Profile retrieved successfully',
        data: userResponse
      });
    } catch (error) {
      return res.status(404).json({ 
        message: error.message 
      });
    }
  }

  async validateToken(req, res) {
    try {
      const token = req.body.token || req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(400).json({ 
          valid: false,
          message: 'Token is required' 
        });
      }

      const validationResult = authService.validateToken(token);
      
      if (!validationResult.valid) {
        return res.status(401).json({
          valid: false,
          message: validationResult.error
        });
      }

      return res.status(200).json({
        valid: true,
        message: 'Token is valid',
        data: {
          userId: validationResult.decoded.id,
          email: validationResult.decoded.email,
          role: validationResult.decoded.role,
          user: validationResult.user
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        valid: false,
        message: 'Token validation failed' 
      });
    }
  }

}





module.exports = new AuthController();