const { Number } = require('mongoose');
const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const path = require('path');
//const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Otra forma de obtener el objeto es :
//          const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    image_id: { type: ObjectId },
    name: { type: String},
    product: { type: String},
    precio: { type: Number},
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },    
    timestamp: { type: Date, default: Date.now }

});

    ProductSchema.virtual('uniqueProd')
    .get(function () {
      return this.filename.replace(path.extname(this.filename), '')
    })    
module.exports = model('Product', ProductSchema);