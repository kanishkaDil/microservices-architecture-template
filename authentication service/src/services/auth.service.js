const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const { AuthResponseDto, UserResponseDto  } = require('../dto/auth.dto');

class AuthService {
  async login(loginDto) {
    const user = userRepository.findByEmail(loginDto.email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    return new AuthResponseDto(token, user);
  }

  generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  validateToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = userRepository.findById(decoded.id);
      
      if (!user) {
        throw new Error('User not found');
      }

      return {
        valid: true,
        decoded: decoded,
        user: new UserResponseDto(user)
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }

  getUserById(id) {
    const user = userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = new AuthService();