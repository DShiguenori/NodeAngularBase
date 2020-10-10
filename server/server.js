// Carrega todas as variáveis de ambiente do meu arquivo '.env'
require('dotenv').config()

// Necessário para iniciar o node:
const express = require('express');
// Instancia o express no app
const app = express();
// Necessário para iniciar o mongo
const mongoose = require('mongoose');

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

// Adiciona um middleware que permite o servidor aceitar um json dentro de um body
app.use(express.json());

// Permite usar o subscriber
const subscribersRouter = require('./router/subscribers')
app.use('/subscribers', subscribersRouter);
// Entrará no 'localhosr:3000/subscribers/xxx'

// Inicia o app na porta 3000
app.listen(3000, () => {
    console.log('Servidor Iniciou');
})