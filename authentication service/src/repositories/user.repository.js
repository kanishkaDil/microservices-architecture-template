const bcrypt = require('bcryptjs');

class UserRepository {
  constructor() {
    // Hardcoded users with hashed passwords
    // Password for all: "password123"
    this.users = [
      {
        id: 1,
        email: 'admin@example.com',
        password: bcrypt.hashSync('password123', 10),
        name: 'Admin User',
        role: 'admin'
      },
      {
        id: 2,
        email: 'user@example.com',
        password: bcrypt.hashSync('password123', 10),
        name: 'Regular User',
        role: 'user'
      },
      {
        id: 3,
        email: 'manager@example.com',
        password: bcrypt.hashSync('password123', 10),
        name: 'Manager User',
        role: 'manager'
      }
    ];
  }

  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findById(id) {
    return this.users.find(user => user.id === id);
  }

  getAllUsers() {
    return this.users;
  }
}

module.exports = new UserRepository();