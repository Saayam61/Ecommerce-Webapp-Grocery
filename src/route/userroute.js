const express = require('express');
const router = express.Router();

const userController = require('../controller/user_controller');

router.get('/reg', userController.getIndex)
router.post('/register', userController.registerUser)

module.exports = router;