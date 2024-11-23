const ServiceCliente = require('../services/cliente')

class ControllerCliente {
    async GetClientes(req, res) {
        try {
            const clientes = await ServiceCliente.GetClientes()
            res.send({ msg: clientes })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async CreateCliente(req,res){
        try {
            const { name, email, password } = req.body

            const cliente = await ServiceCliente
                .CreateCliente(name, email, password)
            res.send({ msg: cliente })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async UpdateCliente(req,res){
        try {
            const id = req.params.id
            const name = req.body.name
            const email = req.body.email
            const password = req.body.password

            const cliente = await ServiceCliente
                .UpdateCliente(id, name, email, password)

            res.send({ msg: cliente })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async DeleteCliente(req,res){
        try {
            const id = req.params.id
            await ServiceCliente.DeleteCliente(id)
            res.status(204).send()
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async Login(req, res) {
        try {
            const { email, password } = req.body
            const token = await ServiceCliente.Login(email, password)
            res.status(200).send({ token })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ControllerCliente()