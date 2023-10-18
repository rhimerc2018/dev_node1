const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async(clave) => {
    const salt = await bcrypt.genSalt(10);
    const clavefinal = await bcrypt.hash(clave,salt);
    return clavefinal;
};

helpers.matchPassword = async(clave, savedPassword) => {

    try{
      return  await bcrypt.compare(clave, savedPassword);
    } catch(e) {
        console.log("matchPassword ------------------------------->", e);
    }
};

module.exports = helpers;