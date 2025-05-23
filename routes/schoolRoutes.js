const express = require('express');
const { listSchools,addSchool } = require('../controllers/schoolController');
router= express.Router();
router.post("/addSchool",addSchool);
router.get('/listSchools',listSchools);

module.exports = router;