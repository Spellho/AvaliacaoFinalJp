const ModelFilmeLocado = require('../models/filmeLocado')
const ServiceFilme = require('./filme')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')

const SALT = 12

class ServiceFilmeLocado {
    async Locar(idFilme, idCliente) {
        if(!idFilme || !idCliente){
            throw new Error("Favor preencher todos os dados!")
        }
        const filme = await ServiceFilme.GetFilme(idFilme)
        if(!filme) {
            throw new Error("Filme não encontrado")
        }
        return ModelFilmeLocado.create({ idFilme, idCliente})
    }
    async Devolver(id, idCliente) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const filmeLocado = await ModelFilmeLocado.findByPk(id)
        if(!filmeLocado || filmeLocado.idCliente != idCliente || filmeLocado.dataDevolucao) {
            throw new Error("Locação não encontrada")
        }
        filmeLocado.dataDevolucao = Sequelize.fn('now')
        filmeLocado.save()
        return filmeLocado
    }
}
module.exports = new ServiceFilmeLocado()