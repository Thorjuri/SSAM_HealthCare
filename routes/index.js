const express = require("express");
const router = express.Router();
const usersRouter = require('./users');
const evaluationsRouter = require('./evaluations');
const contentsRouter = require('./contents');

router.use('/users', usersRouter);
router.use('/evaluations', evaluationsRouter);
router.use('/contents', contentsRouter);

module.exports = router;