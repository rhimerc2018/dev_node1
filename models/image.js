const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;
const path = require('path');
// const mongooseLeanVirtuals = require('mongoose-lean-virtuals');


const ImageSchema = new Schema({
  galeria_id: { type: ObjectId },
  title: { type: String },
  description: { type: String },
  street: { type: String },
  number: { type: Number },
  local: { type: Number },
  letra: { type: String },
  filename: { type: String },
  categoria: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

ImageSchema.virtual('uniqueId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '')
  }) 
module.exports = mongoose.model('Image', ImageSchema);