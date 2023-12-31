const path = require('path');
const { randomNumber }  = require('../helpers/libs');
const fs = require('fs-extra');

// const { Image } = require('../models/index');

// No es necesario el index, porque lo toma por defecto, ya que index tiene acceso a todos los modelos
 const { Image } = require('../models/image');
const { json } = require('express');

const ctrl = {};

ctrl.index = (req,res) => {

};

ctrl.create =  (req,res) => {

    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({filename:imgUrl});
            if ( images.length > 0 ) {
                saveImage();
            }else{  
                    //   console.log(imgUrl);
                const imageTempPath = req.file.path;
                const ext = path.extname(req.file.originalname).toLowerCase();
                const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)

                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ){
                    await fs.rename(imageTempPath, targetPath);
                    // Llama al modelo image.js
                    const newImg = new Image({  
                        title: req.body.titulo,
                        filename: imgUrl + ext,
                        description: req.body.descripcion
                    });
                    const imageSaved = await newImg.save();
                    res.redirect('/images');
                } else {
                    await fs.unlink(imageTempPath);
                    res.status(650).json({error: 'Debe enviar una imagen'});
                }

                res.send('Envío Exitoso');
            }
    };
    saveImage();
};

ctrl.like = (req,res) => {

};

ctrl.comment = (req,res) => {

};

ctrl.remove = (req,res) => {

};




module.exports = ctrl;