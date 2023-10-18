const { strict } = require('assert');
const { Number } = require('mongoose');
const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const path = require('path');
const bcrypt = require('bcryptjs');
//const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

// Otra forma de obtener el objeto es :
//          const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true},
    fullname: { type: String, required: true },
    typeuser:  { type: String, required: true }
}, {
    timestamps: { type: Date, default: Date.now } 
});

    UserSchema.methods.encryptPassword = async password => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt );
    };

    UserSchema.methods.matchPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    UserSchema.virtual('uniqueUser')
    .get(function () {
      return this.filename.replace(path.extname(this.filename), '')
    })    
    
module.exports = model('User', UserSchema);