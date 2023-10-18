const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Otra forma de obtener el objeto es :
//          const ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    product_id: { type: ObjectId },
    aggregate: { type: String}, 
    amount: { type: Number, default: 0 },
    name: { type: String},
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },    
    timestamp: { type: Date, default: Date.now }

});

OrderSchema.virtual('product')
    .set(function (product) {
        this._product = product;
    })
    .get(function () {
        return this._product;
    });
    
module.exports = model('Order', OrderSchema);