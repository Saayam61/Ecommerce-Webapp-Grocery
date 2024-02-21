const express = require('express')
const router = express.Router()

const app = express()

//controller calling
const indexController = require("./../controller/index_controller")

//Route Set
router.get('/', indexController.getIndex)

module.exports = router