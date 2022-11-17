const express = require("express");
const router = express.Router();
const EvaluationsController = require('../controllers/evaluationsController');
const evaluationsController = new EvaluationsController();

module.exports = router;