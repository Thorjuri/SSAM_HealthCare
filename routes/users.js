const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/usersController');
const usersController = new UsersController();

router.post('/signup')


module.exports = router;