const ModelCliente = require('../models/cliente')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT = 12

class ServiceCliente {
    async GetClientes() {
        return ModelCliente.findAll()
    }
    async CreateCliente(name, email, password) {
        if(!name || !email || !password){
            throw new Error("Favor preencher todos os dados!")
        }
        const hashSenha = await bcrypt.hash(password, SALT)
        return ModelCliente.create({ name, email, password: hashSenha })
    }
    async UpdateCliente(id, name, email, password) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const cliente = await ModelCliente.findByPk(id)
        if(!cliente) {
            throw new Error("Cliente não encontrado")
        }
        cliente.name = name || cliente.name
        cliente.email = email || cliente.email
        cliente.password = password
            ? await bcrypt.hash(password, SALT)
            : cliente.password

        cliente.save()
        return cliente
    }
    async DeleteCliente(id) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const cliente = await ModelCliente.findByPk(id)
        if(!cliente) {
            throw new Error("Cliente não encontrado")
        }
        return cliente.destroy()
    }

    async Login(email, password) {
        if(!email || !password) {
            throw new Error("Email ou senha inválido!")
        }

        const cliente = await ModelCliente.findOne({ where: { email } })

        if(!cliente) {
            throw new Error("Email ou senha inválido!")
        }

        const senhaValida = bcrypt.compare(password, cliente.password)

        if(!senhaValida) {
            throw new Error("Email ou senha inválido!")
        }

        return jwt.sign({ id: cliente.id }, 'segredo', { expiresIn: 60 * 60 })
    }
}
module.exports = new ServiceCliente()