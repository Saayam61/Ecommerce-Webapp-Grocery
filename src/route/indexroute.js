const express = require('express')
const router = express.Router()

//controller calling
const indexController = require("./../controller/index_controller")

//Route Set
router.get('/', indexController.getIndex)

module.exports = router