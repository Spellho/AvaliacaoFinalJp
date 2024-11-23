const ModelFilme = require('../models/filme')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT = 12

class ServiceFilme {
    async GetFilmes() {
        return ModelFilme.findAll()
    }
    async GetFilme(id) {
        return ModelFilme.findByPk(id)
    }
    async CreateFilme(titulo, faixaEtaria, diretor) {
        if(!titulo || !faixaEtaria || !diretor){
            throw new Error("Favor preencher todos os dados!")
        }
        return ModelFilme.create({ titulo, faixaEtaria, diretor })
    }
    async UpdateFilme(id, titulo, faixaEtaria, diretor) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const filme = await ModelFilme.findByPk(id)
        if(!filme) {
            throw new Error("Filme não encontrado")
        }
        filme.titulo = titulo || filme.titulo
        filme.faixaEtaria = faixaEtaria || filme.faixaEtaria
        filme.diretor = diretor || filme.diretor
        filme.save()
        return filme
    }
    async DeleteFilme(id) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const filme = await ModelFilme.findByPk(id)
        if(!filme) {
            throw new Error("Filme não encontrado")
        }
        return filme.destroy()
    }
}
module.exports = new ServiceFilme()