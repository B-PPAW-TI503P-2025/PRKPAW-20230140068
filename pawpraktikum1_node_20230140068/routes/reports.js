const express = require('express');
const router = express.Router();
 	const reportController = require('../controllers/ReportController');
 	const { addUserData, isAdmin } = require('../middleware/permissionMiddleware');
 	router.get('/daily', [addUserData, isAdmin], reportController.getDailyReport);
 	module.exports = router;