const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/update-images');
const path = require('path');
const fs = require('fs');

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tabla;
    const id = req.params.id;

    const tablasValidas = ['hospitales', 'medicos', 'usuarios'];

    if (!tablasValidas.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: `Tablas invalida: ${ tipo }, deber ser medicos, usuarios o hospitales.`
        });


    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'File not found'
        })
    }
    //Procesar la imagen

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1]; //Obtener la extension

    //Validar Extensiones
    const extensionValidas = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF'];

    if (!extensionValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid Extensions'
        })
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extension}`;

    // Path del Archivo

    const path = `./upload/${ tipo }/${ nombreArchivo }`;

    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })

        }
        // Se Actualiza la imagen
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo Subido',
            nombreArchivo
        })
    });

}

const retornarImg = (req, res = response) => {
    const tabla = req.params.tabla;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../upload/${ tabla }/${ foto }`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../upload/no-image.png`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    retornarImg
}