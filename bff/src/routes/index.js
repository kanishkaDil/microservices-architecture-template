const express = require('express');
const authRoutes = require('./auth.routes');
const businessRoutes = require('./business.routes');

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/checklist', businessRoutes);


module.exports = router;