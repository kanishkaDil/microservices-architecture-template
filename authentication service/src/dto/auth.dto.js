class LoginDto {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  validate() {
    const errors = [];
    if (!this.email || !this.email.trim()) {
      errors.push('Email is required');
    }
    if (!this.password || !this.password.trim()) {
      errors.push('Password is required');
    }
    return errors;
  }
}

class UserResponseDto {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
  }
}

class AuthResponseDto {
  constructor(token, user) {
    this.token = token;
    this.user = new UserResponseDto(user);
  }
}

module.exports = {
  LoginDto,
  UserResponseDto,
  AuthResponseDto
};