const express = require("express");
const router = express.Router();
const ContentsController = require('../controllers/contentsController');
const contentsController = new ContentsController();

module.exports = router;