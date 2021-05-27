require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async() => {


    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Online');
        console.log(process.env.DB_CNN);

    } catch (error) {
        console.log(error)
        throw new Error('Error en la conection');

    }

}

module.exports = {
    dbConnection
}