const handlebars = require("handlebars");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

module.exports = {

    Galeria: require('./galeria'),
    Edificio: require('./edificio'),
    Image: require('./image'),
    Comment: require('./comment'),
    Product: require('./product'),
    CommentProd: require('./commentprod'),
    CommentGal: require('./commentgal'),
    Typeprod: require('./typeprod'),
    Order: require('./order'),
    Ingredient: require('./ingredient'),
    User: require('./user'),
    Recomienda: require('./recomienda')

};