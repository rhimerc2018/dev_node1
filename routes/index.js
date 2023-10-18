const express = require('express');
const router = express.Router();
const Instagram = require('node-instagram');

const home = require('../controllers/home');
const image = require('../controllers/image');
const comenzar = require('../controllers/comenzar');


module.exports = app => {

    router.get('/home/rrss', image.rrss);
    router.get('/', comenzar.index);
    router.get('/home', home.index);
    router.get('/home/edificios', home.indexedf);
    router.get('/home/lavanderias', home.indexlav);
    router.get('/galerias/:gallery_id', image.indexgal);
    router.post('/galerias', image.creategal);
    router.post('/galerias/:galeria_id/image', image.createimg);
    router.post('/galeria/:filename/like', image.likegal);
    router.delete('/galerias/:galeria_id', image.removegal);
    router.post('/galerias/:galeria_id', image.commentgal);
    router.get('/images/:uniqueId', image.indeximg);    
    router.get('/products/:uniqueProd/:image_id', image.indexprd);
//    router.post('/images', image.create); 
    router.post('/image/:image_id/like', image.like);
    router.post('/product/:filename/like', image.likeprd);
    router.post('/images/:image_id/comment', image.comment);
    router.post('/images/comment', image.comment);
    router.delete('/images/:image_id', image.remove);
    router.delete('/products/:product_id', image.removeprod);
    router.post('/images/:image_id/product', image.createprod);
    router.post('/products/:product_id/comment', image.commentprod);
    router.post('/products/:product_id/ingredient', image.createingrd);
    router.post('/typeprod', image.creatypeprod);
    router.post('/images/:image_id/recomienda', image.creatercmd);

    app.use(router);
    

};