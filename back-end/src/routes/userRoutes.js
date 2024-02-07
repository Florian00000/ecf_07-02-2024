const expres = require('express');
const userController = require('../controllers/userController');

const router = expres.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;