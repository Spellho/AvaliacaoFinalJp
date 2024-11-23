const express = require('express')
const ControllerFilme = require('../controllers/filme')
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/', ControllerFilme.CreateFilme)

router.get('/', ControllerFilme.GetFilmes)
router.put('/:id', ControllerFilme.UpdateFilme)
router.delete('/:id', ControllerFilme.DeleteFilme)

module.exports = router