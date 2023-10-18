const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;
const path = require('path');
// const mongooseLeanVirtuals = require('mongoose-lean-virtuals');


const ImageSchema = new Schema({
  image_id: { type: ObjectId },
  title: { type: String },
  description: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  filename: { type: String },
  timestamp: { type: Date, default: Date.now },
  recomimg_id: { type: ObjectId }
});

ImageSchema.virtual('recomnegId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '')
  }) 
module.exports = mongoose.model('Recomienda', ImageSchema);