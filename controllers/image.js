const path = require('path');
const { randomNumber }  = require('../helpers/libs');
const fs = require('fs-extra');
const handlebars = require('handlebars');
const image = require('mongoose-lean-virtuals');
const comments = require('mongoose-lean-virtuals');
const md5 = require('md5');



// const { Image } = require('../models/index');

// No es necesario el index, porque lo toma por defecto, ya que index tiene acceso a todos los modelos
 const { Image, Comment } = require('../models');   
 const sidebar = require('../helpers/sidebar');
//const { json } = require('express');

const ctrl = {};

ctrl.index = async (req,res) => {
    let viewModel = { image: {}, comments: {}};

    if ( image ) {
        const image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean({virtuals:true});
        image.views = image.views + 1;
        const newImg = new Image({
            title: image.title,
            filename: image.filename,
            description: image.description,
            likes: image.likes,
            views: image.views,
            timestamp: image.timestamp
        });
    
        viewModel.image = image;

        await newImg.save();
        const comments = await Comment.find({image_id: image._id}).lean({virtuals:true});

        viewModel.comments = comments;

        viewModel = await sidebar(viewModel);


        console.log('params1 : ',req.params.image_id);
        console.log(image);
        console.log(comments);


 //       res.render('image',image);
         res.render('image',viewModel);

    }else {
        res.rediretc('/');
    }


};

ctrl.create = async (req,res) => {
    const imgUrl = randomNumber();

    console.log('IMAGENES11111 : ',req.params.image_id);    
    console.log('imgUrl : ',imgUrl);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ){
       await fs.rename(imageTempPath, targetPath);
       // Llama al modelo image.js
       const newImg = new Image({
           title: req.body.titulo,
           filename: imgUrl + ext,
           description: req.body.descripcion
       });
       const imageSaved = await newImg.save();
        res.redirect('/images/'+imgUrl);

    } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({error: 'Debe enviar una imagen'})
    };

    console.log("URL111", imgUrl);
    res.redirect('/images'+imgUrl);
 //   res.send('Envío Exitoso');
};

ctrl.like = async (req,res) => {
    const image = await Image.findOne( {filename: {$regex: req.params.image_id}})
    if (image) {
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes: image.likes});
    }else{
        res.status(500).json({erro: 'Error Interno'});
    }

};

ctrl.comment = async (req,res) => {
  //  const image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean({virtuals:true});
 //   if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        console.log(newComment);
        await newComment.save();
 //       res.redirect('/images/'+image.uniqueId);
        res.render('image',newComment);
 //   }

};

ctrl.remove = async (req,res) => {
    // console.log(req.params.image_id)
    const image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean({virtuals:true});;
    if ( image ){
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        await Comment.deleteOne({image_id: image._id});
        await image.remove();
        res.json(true);
    }

};

module.exports = ctrl;