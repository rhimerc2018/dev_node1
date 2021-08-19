const handlebars = require('handlebars');

const { Image } = require('../models');

module.exports = {

    async popular() {
        const images = await Image.find().lean()
            .limit(9)
            .sort({ likes: -1 });
        return images;
    }
};
