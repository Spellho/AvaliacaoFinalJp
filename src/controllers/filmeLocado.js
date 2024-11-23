const filmeLocado = require('../models/filmeLocado')
const ServiceFilmeLocado = require('../services/filmeLocado')

class ControllerFilmeLocado {
    async Locar(req,res){
        try {
            const idFilme = Number(req.body.idFilme)
            const idCliente = req.session.id

            const filmeLocado = await ServiceFilmeLocado
                .Locar(idFilme, idCliente)
            res.send({ msg: filmeLocado })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async Devolver(req,res){
        try {
            const id = req.params.id
            const idCliente =req.session.id

            const filmeLocado = await ServiceFilmeLocado
                .Devolver(id, idCliente)

            res.send({ msg: filmeLocado })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ControllerFilmeLocado()