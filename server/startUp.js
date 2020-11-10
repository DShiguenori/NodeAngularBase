// Necessário para iniciar o node:
const express = require('express');
// Necessário para iniciar o mongo
const mongoose = require('mongoose');

// Carrega todas as variáveis de ambiente do meu arquivo '.env'
require('dotenv').config();

module.exports.start = function (){

    const app = express();

    this.initDatabase()
    
    this.initJson(app);

    this.initRoutes(app);

    this.initPort(app);
}

module.exports.initDatabase = function(){
    // Removi a URL daqui e coloquei na .env
    //const serverUri = 'mongodb+srv://shiguenori:nodeangular2020@uemacluster.8qagy.azure.mongodb.net/nodeAngularBase?retryWrites=true&w=majority'

    // Conecta no banco de dados mongoose (ver o atlas)
    mongoose.connect(process.env.DATABASE_URL,  { useUnifiedTopology: true }, { useNewUrlParser: true });

    // Instancia a conexão:
    const db  = mongoose.connection;
    // Em caso de erro no banco de dados:
    db.on('error', (errror) => console.error(error));
    // Quando o banco abrir:
    db.once('open', (errror) => console.log('Database conectado'));
}

module.exports.initJson = function(app){
    // Adiciona um middleware que permite o servidor aceitar um json dentro de um body
    app.use(express.json());
}

module.exports.initRoutes = function(app) {
    // Permite usar o humans
    const personRouter = require('./routes/human')
    app.use('/', personRouter);
}

module.exports.initPort = function(app){
    // Inicia o app na porta 3000
    app.listen(3000, () => {
        console.log('Servidor Iniciou');
    })
}