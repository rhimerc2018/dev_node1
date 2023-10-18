const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Otra forma de obtener el objeto es :
//          const ObjectId = Schema.ObjectId;

const CommentProdSchema = new Schema({
    product_id: { type: ObjectId },
    email: { type: String},
    name: { type: String},
    gravatar: { type: String},
    comment: { type: String},
    timestamp: { type: Date, default: Date.now }
});

CommentProdSchema.virtual('product')
    .set(function (product) {
        this._product = product;
    })
    .get(function () {
        return this._product;
    });
    
module.exports = model('CommentProd', CommentProdSchema);