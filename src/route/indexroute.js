const express = require('express')
const router = express.Router()

//controller calling
const indexController = require("../controller/indexController")

//Route Set
router.get('/', indexController.getIndex)

module.exports = router