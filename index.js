const express = require('express')
const routersCliente = require('./src/routes/cliente')
const routersFilme = require('./src/routes/filme')
const routersFilmeLocado = require('./src/routes/filmeLocado')
const database = require('./src/config/database')

const app = express()
app.use(express.json())
app.use("/cliente", routersCliente)
app.use("/filme", routersFilme)
app.use("/filmeLocado", routersFilmeLocado)
const PORT = 3000

database.db
    .sync({ force: true })
    .then((_) => {
        console.info("Banco conectado com sucesso")
        app.listen(PORT, () => {
            console.info(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((e) => {
        console.error(`Conexão falhou: ${e}`)
    })


