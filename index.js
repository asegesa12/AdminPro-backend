// User: mean_user
// Password: P5L3gPj0jUiIJeJg

const express = require('express');

const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

dbConnection();

app.use(cors());

app.use(express.json());

app.use('/api/usuarios', require('./Routes/usuario'))
app.use('/api/login', require('./Routes/auth'))

app.listen(3000, () => {
    console.log('Escuchando desde el port');
})