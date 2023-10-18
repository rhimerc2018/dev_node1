const path = require('path');
const { randomNumber }  = require('../helpers/libs');
const fs = require('fs-extra');
const image = require('mongoose-lean-virtuals');
const comments = require('mongoose-lean-virtuals');
const md5 = require('md5');


// No es necesario el index, porque lo toma por defecto, ya que index tiene acceso a todos los modelos
 const { Image } = require('../models');   
 const { Galeria } = require('../models');   
 const { Comment } = require('../models'); 
 const { Product } = require('../models'); 
 const { Ingredient } = require('../models');  
 const { CommentProd } = require('../models');
 const { CommentGal } = require('../models');
 const { Typeprod } = require('../models');
 const { Recomienda } = require('../models');
 
 const sidebargall = require('../helpers/sidebargall');
 const sidebarimg = require('../helpers/sidebarimg');
 const sidebarprod = require('../helpers/sidebarprod');

const ctrl = {};

ctrl.indexgal = async (req,res) => {

    let viewModel = { sidebargall: [{}], galeria: {}, images: {}, commentsgal: [{}],  comments: {}, products: {} , totalimg: {} , totalprod: {}, totalcomm: {}, totalcommgal: {} };
    const galeria = await Galeria.findOne({filename: {$regex: req.params.gallery_id}});

    if ( galeria ) {          
        galeria.views = galeria.views + 1;
        viewModel.galeria = galeria;
        await galeria.save();

        const images = await Image.find({galeria_id: galeria._id}).sort({ number: 1, local: 1, letra: -1 });
        viewModel.images = images;
        const totgall = Galeria.countDocuments({galeria_id: {$eq : galeria._id}});
        viewModel.totalgall = totgall;
        const totimg = Image.countDocuments({galeria_id: {$eq : galeria._id}});
        viewModel.totalimg = totimg;
        const totcommgal = CommentGal.countDocuments({galeria_id: {$eq : galeria._id}});
        viewModel.totalcommgal = totcommgal;
        const products = await Product.find({image_id: image._id});
        viewModel.products = products;
        const totprod = Product.countDocuments({image_id: {$eq : image._id}});
        viewModel.totalprod = totprod;
        const commentsgal = await CommentGal.find({galeria_id: galeria._id});
        viewModel.commentsgal = commentsgal;
        const comments = await Comment.find({image_id: image._id});
        viewModel.comments = comments;
        const totcomm = Comment.countDocuments({image_id: {$eq : image._id}});
        viewModel.totalcomm = totcomm;
        viewModel = await sidebargall(viewModel);
         res.render('galeria',viewModel); 
     //       res.json ({images,galeria});
        
    }else {
        res.redirect('/');
    }
};

ctrl.indeximg = async (req,res) => {

    let viewModel = { image: {}, comments: {}, products: {} , recomimgs: {}, totalprod: {}, totalcomm: {} };
    const image = await Image.findOne({filename: {$regex: req.params.uniqueId}});

    if ( image ) {          
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

        await image.save();
        const totimages= await Image.find();
        viewModel.totalimagesrcmd = totimages;
        const comments = await Comment.find({image_id: image._id});
        viewModel.comments = comments;
        const totcomm = Comment.countDocuments({image_id: {$eq : image._id}});
        viewModel.totalcomm = totcomm;
        const recomimgs = await Recomienda.find({image_id: image._id});
        viewModel.recomimgs = recomimgs;
        const products = await Product.find({image_id: image._id});
        viewModel.products = products;
        const totprod = Product.countDocuments({image_id: {$eq : image._id}});
        viewModel.totalprod = totprod;

        viewModel = await sidebarimg(viewModel);
         res.render('image',viewModel);
 //   res.json(viewModel.image);
    }else {
        res.redirect('/');
    }
};

ctrl.indexprd = async (req,res) => {

    let viewModel = { image: {}, comments: {}, products: {}, product: {}, totprodcomm: {}, ingredients: {}}
     const product = await Product.findOne({filename: {$regex: req.params.uniqueProd}});
     const image_id = req.params.image_id;
     
    if ( product ) {          
        product.views = product.views + 1;
/*         const newImg = new Product({
            image_id: products.image_id,
            filename: products.filename,
            product: products.product,
            name: products.name,
            likes: products.likes,
            views: products.views,
            timestamp: products.timestamp
        }); */
    
        viewModel.product = product;

        await product.save();
        const commentsprod = await CommentProd.find({product_id: product._id});
        viewModel.comments = commentsprod;
        const commprod = CommentProd.countDocuments({product_id: {$eq : product._id}});
        viewModel.totprodcomm = commprod;
        const products = await Product.find({image_id: image_id});
        viewModel.products = products;
        const ingredients = await Ingredient.find({product_id: product._id});
        viewModel.ingredients = ingredients;
        const totingrd = Ingredient.countDocuments({product_id: {$eq : product._id}});
        viewModel.totalingrd = totingrd;

        viewModel = await sidebarprod(viewModel);
         res.render('product',viewModel);
    }else {
        res.redirect('/');
    }
};

ctrl.creategal = async (req,res) => {

    const imgUrl = randomNumber();   
    const imageTempPath = req.file.path;

    const ext = path.extname(req.file.originalname).toLowerCase(); 
    const targetPath = path.resolve(`src/public/upload/home/${imgUrl}${ext}`);     
//      const targetPath = path.resolve(`C:/A ANode/socialsuecia_20230201/produccion_angular/frontend/src/assets/upload/home/${imgUrl}${ext}`);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ){
        await fs.rename(imageTempPath, targetPath);
        
        // Llama al modelo image.js
        const newImg = new Galeria({
        title: req.body.titulo,
        street: req.body.street,
        number: req.body.number,
        filename: imgUrl + ext,
        description: req.body.descripcion
    });
    const imageSaved = await newImg.save();
    res.redirect('/images/'+imgUrl);
    }else{
        await fs.unlink(imageTempPath);
        res.status(500).json({error: 'Debe enviar una imagen'});
    }
};

ctrl.likegal = async (req,res) => {
    const galeria = await Galeria.findOne( {filename: {$regex: req.params.filename}})
    if (galeria) {
        galeria.likes = galeria.likes + 1;
        await galeria.save();
        res.json({likes: galeria.likes});
    }else{
        res.status(500).json({erro: 'Error Interno'});
    }
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

ctrl.likeprd = async (req,res) => {
    const product = await Product.findOne( {filename: {$regex: req.params.filename}})
    if (product) {
        product.likes = product.likes + 1;
        await product.save();
        res.json({likes: product.likes});
    }else{
        res.status(500).json({erro: 'Error Interno'});
    }
};

ctrl.commentgal = async (req,res) => {

    const galeria = await Galeria.findOne({filename: {$regex: req.params.galeria_id}}).lean({virtuals:true});
    if (galeria) {
        const newComment = new CommentGal(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.galeria_id = galeria._id;
        await newComment.save();
        res.redirect('/images/'+galeria.uniqueId);
 //       res.render('image',newComment);
    } else {
        res.redirect('/');
    }
};

ctrl.comment = async (req,res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean({virtuals:true});
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/'+image.uniqueId);
 //       res.render('image',newComment);
    } else {
        res.redirect('/');
    }
};

ctrl.commentprod = async (req,res) => {
    const product = await Product.findOne({filename: {$regex: req.params.product_id}}).lean({virtuals:true});
    if (product) {
        const newCommentProd = new CommentProd(req.body);
        newCommentProd.gravatar = md5(newCommentProd.email);
        newCommentProd.product_id = product._id;
        await newCommentProd.save();
        res.redirect('/product/'+product.uniqueProd);
 //       res.render('image',newComment);
    } else {
        res.redirect('/');
    }
};

ctrl.createimg = async (req,res) => {

    const galeria = await Galeria.findOne({filename: {$regex: req.params.galeria_id}}).lean({virtuals:true});
    if (galeria) {
        const galUrl = randomNumber();   
        const galeriaTempPath = req.file.path;

        console.log("CREA IMG --->  ", galeriaTempPath );
        const ext = path.extname(req.file.originalname).toLowerCase(); 
        const targetPath = path.resolve(`src/public/upload/negocio/${galUrl}${ext}`);        
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ){
            await fs.rename(galeriaTempPath, targetPath);

            console.log("targetPath ---> ", targetPath);
            
            // Llama al modelo image.js
        const newImage = new Image(req.body);
        newImage.galeria_id = galeria._id;
        newImage.filename = galUrl + ext;
        newImage.recomimg_id = galeria._id;
        await newImage.save();       
        res.redirect('/images/'+galUrl);
 //       res.render('galeria',newImage);
    } else {
        res.redirect('/');
    }
}
};

ctrl.creatercmd = async (req,res) => {

    const image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean({virtuals:true});

    if (image) {             
      // Llama al modelo image.js
        const newImage = new Recomienda(req.body);
        newImage.image_id = image._id;
        console.log("req.body.recomimg_id -->",req.body.recomimg_id);
        const imagercmd = await Image.findOne({_id: req.body.recomimg_id}).lean({virtuals:true});
        newImage.filename = imagercmd.filename;
        await newImage.save();       
   //     res.redirect('/images/'+galUrl);
 //       res.render('galeria',newImage);
    } else {
        res.redirect('/');
    }
};

ctrl.createprod = async (req,res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}}).lean({virtuals:true});

    console.log("PRODUCTO NUEVO DE LA IMAGEN : ", image);
    console.log("PRODUCTO NUEVO ");

    if (image) {
        const imgUrl = randomNumber();   
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase(); 
        const targetPath = path.resolve(`src/public/upload/product/${imgUrl}${ext}`);

        console.log("---> imageTempPath : ", imageTempPath);
        console.log("---> ext : ", ext);
        console.log("---> targetPath : ", targetPath);        

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ){
            await fs.rename(imageTempPath, targetPath);      
            // Llama al modelo image.js
        const newProduct = new Product(req.body);
        newProduct.image_id = image._id;
        newProduct.filename = imgUrl + ext;
        await newProduct.save();
        res.redirect('/products/'+imgUrl+'/'+image._id);
//        res.render('image',newProduct);
    } else {
        res.redirect('/');
    }
}
};

ctrl.createingrd = async (req,res) => {
    const product = await Product.findOne({filename: {$regex: req.params.product_id}}).lean({virtuals:true});
    if (product) {
        const ingrdUrl = randomNumber();   
        const ingredientTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase(); 
        const targetPath = path.resolve(`src/public/upload/ingredient/${ingrdUrl}${ext}`);
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ){
            await fs.rename(ingredientTempPath, targetPath);
            
            // Llama al modelo ingredient
        const newIngredient = new Ingredient(req.body);
        newIngredient.product_id = product._id;
        newIngredient.filename = ingrdUrl + ext;

        await newIngredient.save();
        res.redirect('/ingredients/'+ingrdUrl+'/'+product._id);
//        res.render('product',newIngredient);
    } else {
        res.redirect('/');
    }
}
};

ctrl.removegal = async (req,res) => {

    const galeria = await Galeria.findOne( {filename: {$regex: req.params.galeria_id } } );
    if ( galeria ){
        await fs.unlink(path.resolve('./src/public/upload/home/' + galeria.filename));
        await galeria.remove();
//        M.toast({html: 'Borrada'});
        res.json(true);
    }
};

ctrl.rrss = (req,res) => {
    const spawn = require("child_process").spawn
    const pythonProcess =  spawn("python", ["instagram.py"])
    
    let pythonResponse = ""
    
    pythonProcess.stdout.on("data", function(data)
    {
        pythonResponse += data.toString()
    })

    pythonProcess.stdout.on("end", function() {
        console.log(pythonResponse)
    })
    pythonProcess.stdin.write("Ricardo")

    pythonProcess.stdin.end()
};

ctrl.remove = async (req,res) => {

    const image = await Image.findOne( {filename: {$regex: req.params.image_id } } );
    if ( image ){
        await fs.unlink(path.resolve('./src/public/upload/negocio/' + image.filename));
        await Comment.deleteMany({image_id: image._id});
        await Product.deleteMany({image_id: image._id});
        await image.remove();
//        M.toast({html: 'Borrada'});
        res.json(true);
    }
};

ctrl.removeprod = async (req,res) => {

    const product = await Product.findOne( {filename: {$regex: req.params.product_id } } );
    if ( product ){
        await fs.unlink(path.resolve('./src/public/upload/product/' + product.filename));
        await CommentProd.deleteMany({product_id: product._id});
        await product.remove();
 //       M.toast({html: 'Producto Borrado'});
        res.json(true);
    }
};

ctrl.creatypeprod = async (req,res) => {

    const typeprodUrl = randomNumber();   
    const typeprodTempPath = req.file.path;

    const ext = path.extname(req.file.originalname).toLowerCase(); 
    const targetPath = path.resolve(`src/public/upload/typeprod/${typeprodUrl}${ext}`);
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ){
        await fs.rename(typeprodTempPath, targetPath);
        
        // Llama al modelo image.js
        const newTyprd = new Typeprod({
        name: req.body.name,
        filename: typeprodUrl + ext,
        description: req.body.description
    });
    const typeprodSaved = await newTyprd.save();
    res.render('typeprod');
   // res.redirect('/images/'+typeprodUrl);
    }else{
        await fs.unlink(typeprodTempPath);
        res.status(500).json({error: 'Debe enviar una imagen'});
    }
};
module.exports = ctrl;