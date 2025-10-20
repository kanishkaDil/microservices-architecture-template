const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.post('/login', (req, res) => authController.login(req, res));
router.post('/logout', authenticate, (req, res) => authController.logout(req, res));
router.get('/profile', authenticate, (req, res) => authController.getProfile(req, res));
router.post('/validate-token', (req, res) => authController.validateToken(req, res));

// Example protected route with role-based access
router.get('/admin-only', 
  authenticate, 
  authorize('admin'), 
  (req, res) => {
    res.json({ message: 'Admin access granted', user: req.user });
  }
);

module.exports = router;