const express = require('express');
const router = express.Router();
const { 
  createReport, 
  getReports, 
  updateStatus 
} = require('../controllers/accidentController');

router.post('/report', createReport);

router.get('/all', getReports);

router.patch('/:id/status', updateStatus);

module.exports = router;
