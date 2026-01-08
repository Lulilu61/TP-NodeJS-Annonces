const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report');
const { validateAuthentification } = require('../middlewares/auth');

router.post('/', validateAuthentification, reportController.createReport);

module.exports = router;