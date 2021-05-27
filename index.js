// User: mean_user
// Password: P5L3gPj0jUiIJeJg

const express = require('express');

const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

dbConnection();

app.use(cors());

app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola'
    })
})

app.listen(3000, () => {
    console.log('Escuchando desde el port');
})