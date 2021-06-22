// User: mean_user
// Password: P5L3gPj0jUiIJeJg


const express = require('express');

const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

// Routes Users
app.use('/api/usuarios', require('./Routes/usuario'))
    //Routes Login
app.use('/api/login', require('./Routes/auth'))
    //Search
app.use('/api/todo', require('./Routes/busqueda'))
    // Routes Hospitals
app.use('/api/hospitales', require('./Routes/hospitales'))
    //Routes Medics
app.use('/api/medicos', require('./Routes/medicos'))

app.use('/api/upload', require('./Routes/uploads'))

app.use(express.static('public'))


app.listen(3000, () => {
    console.log('Escuchando desde el port');
})