const handlebars = require("handlebars");
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

module.exports = {

    Image: require('./image'),
    Comment: require('./comment')

};