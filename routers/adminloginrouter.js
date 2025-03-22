
// Backend: adminRoutes.js
const express = require('express');
const obj = require('../controllers/adminlogincontroller');

const router = express.Router();
router.post('/login', obj.adminLogin);

module.exports = router;
