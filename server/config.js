const path = require("path");
const exphbs = require("express-handlebars");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const express = require("express");
const erroHandler = require("errorhandler");
const routes = require("../routes/index");
const Handlebars = require('handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const passport = require('passport');
const flash = require('connect-flash');

require('../lib/passport');
module.exports = app => {

    // Setting
    app.set('port', process.env.PORT || 3010);
    app.use(cors());
    app.set('views', path.join(__dirname,'../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir:path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)

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

        // Midlewares
        app.use(session({
            secret: 'faztmyslnodesession',
            resave: false,
            saveUninitialized: false
        //   store: new MySQLStore(database)
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

    // Global Variables
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.user = req.user;
            next();
    })

    // routes   
    routes(app);
    app.use(require('../routes/authentication'));

    //  errohandlers

    // static files
    app.use('/public',express.static(path.join(__dirname,'../public')));
    
    // errorhandlers
    if ('development' === app.get('env')){
        app.use(erroHandler);
    }
    return app;

}