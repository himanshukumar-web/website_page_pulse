const express = require('express');
const router = express.Router();
const { analyze } = require('../controllers/analyzeController');
const { validateAnalyzeRequest } = require('../validators/urlValidator');

router.post('/analyze', validateAnalyzeRequest, analyze);

module.exports = router;
