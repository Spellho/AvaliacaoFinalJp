const express = require('express')
const ControllerFilmeLocado  = require('../controllers/filmeLocado')
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/', auth, ControllerFilmeLocado.Locar)
router.put('/:id', auth, ControllerFilmeLocado.Devolver)

module.exports = router