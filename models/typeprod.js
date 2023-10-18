const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Otra forma de obtener el objeto es :
//          const ObjectId = Schema.ObjectId;

const TypeprodSchema = new Schema({
    filename: { type: String }, 
    name: { type: String},
    description: { type: String},
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },    
    timestamp: { type: Date, default: Date.now }
});

TypeprodSchema.virtual('uniquetypeprodId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '')
  })
    
module.exports = model('Typeprod', TypeprodSchema);