const { Sequelize } = require('sequelize')
const database = require('../config/database')

class ModelFilmeLocado {
    constructor() {
        this.model = database.db.define('filmeLocado', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idFilme: {
                type: database.db.Sequelize.INTEGER
            },
            idCliente: {
                type: database.db.Sequelize.INTEGER
            },
            dataLocacao: {
                type: database.db.Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
            dataDevolucao: {
                type: database.db.Sequelize.DATE,
            }
        })
    }
}
module.exports = new ModelFilmeLocado().model