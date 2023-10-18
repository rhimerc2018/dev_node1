const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');
// const mongooseLeanVirtuals = require('mongoose-lean-virtuals');


const GaleriaSchema = new Schema({
  title: { type: String },
  description: { type: String },
  street: { type: String },
  number: { type: Number },
  filename: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});


GaleriaSchema.virtual('galeriaId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '')
  })
//  GaleriaSchema.virtual('mongooseLeanVirtuals');
  
module.exports = mongoose.model('Galeria', GaleriaSchema);