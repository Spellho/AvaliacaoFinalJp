const express = require('express')
const ControllerCliente = require('../controllers/cliente')
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/', ControllerCliente.CreateCliente)
router.post('/login', ControllerCliente.Login)

router.get('/', ControllerCliente.GetClientes)
router.put('/:id', ControllerCliente.UpdateCliente)
router.delete('/:id', ControllerCliente.DeleteCliente)

module.exports = router