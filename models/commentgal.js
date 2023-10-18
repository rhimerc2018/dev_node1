const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Otra forma de obtener el objeto es :
//          const ObjectId = Schema.ObjectId;

const CommentGalSchema = new Schema({
    galeria_id: { type: ObjectId },
    email: { type: String},
    name: { type: String},
    gravatar: { type: String},
    comment: { type: String},
    timestamp: { type: Date, default: Date.now }
});

CommentGalSchema.virtual('galeria')
    .set(function (galeria) {
        this._galeria = galeria;
    })
    .get(function () {
        return this._galeria;
    });
    
module.exports = model('CommentGal', CommentGalSchema);