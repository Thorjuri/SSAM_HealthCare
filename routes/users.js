const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/usersController');
const usersController = new UsersController();
const wrapAsyncController = require('../middlewares/wrapAsyncController');
const {user_singup} = require('../middlewares/user_validation');



// router.post('/signup', wrapAsyncController(user_singup), wrapAsyncController(usersController.signup));
// router.post('/checkDup', wrapAsyncController(usersController.checkDup));
// router.post('/login', wrapAsyncController(usersController.login));


module.exports = router;