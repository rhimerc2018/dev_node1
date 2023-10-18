const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Otra forma de obtener el objeto es :
//          const ObjectId = Schema.ObjectId;

const IngredientSchema = new Schema({
    product_id: { type: ObjectId },
    type_id: { type: ObjectId },
    name: { type: String},
    description: { type: String},
    filename: { type: String },
    aggregate: { type: String},
    amount: { type: Number, default: 0 },   
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },    
    timestamp: { type: Date, default: Date.now }

});

IngredientSchema.virtual('order')
    .set(function (order) {
        this._order = order;
    })
    .get(function () {
        return this.order;
    });
    
module.exports = model('Ingredient', IngredientSchema);