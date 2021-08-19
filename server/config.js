const path = require("path");
const exphbs = require("express-handlebars");

const morgan = require("morgan");
const multer = require("multer");
const express = require("express");
const erroHandler = require("errorhandler");
const routes = require("../routes");

module.exports = app => {

    // Setting
    app.set('port', process.env.PORT || 3005);
    app.set('views', path.join(__dirname,'../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir:path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')

    }));
    app.set('view engine', '.hbs');
    
    // Middlewares
         app.use(morgan('dev'));
         
        // -- Indica que se sube solo una imagen al directorio temp, la que llamamos aquí en la variable 
        // "image" la que contendra las propiedades de la imagen
         app.use(multer({dest:path.join(__dirname,'../public/upload/temp')}).single('image')); 

        // -- Para poder recibir los datos que vienen desde un formulario html
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());

    // routes   
    routes(app);

    //  errohandlers

    // static files
    app.use('/public',express.static(path.join(__dirname,'../public')));
 
    
    // errorhandlers
    if ('development' === app.get('env')){
        app.use(erroHandler);
    }

    return app;

}