const moment = require('moment');
const helpers = {};
const handlebars = require('handlebars');

helpers.tiempocomentario = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;