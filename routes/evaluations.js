const express = require("express");
const router = express.Router();
const EvaluationsController = require('../controllers/evaluationsController');
const auth_middleware = require("../middlewares/auth_middleware");
const evaluationsController = new EvaluationsController();
const wrapAsyncController = require('../middlewares/wrapAsyncController');

router.post('/exercise', auth_middleware, wrapAsyncController(evaluationsController.createExer));
router.get('/exercise', auth_middleware, wrapAsyncController(evaluationsController.getExerResult));
router.post('/diet', auth_middleware, wrapAsyncController(evaluationsController.createDiet));
router.get('/diet', auth_middleware, wrapAsyncController(evaluationsController.getDietResult))


module.exports = router;