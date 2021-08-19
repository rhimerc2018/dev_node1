const handlebars = require('handlebars');
const image = require('mongoose-lean-virtuals');

const { Comment, Image } = require('../models');

module.exports = {

    async newest() {
        const comments = await Comment.find().lean()
            .limit(5)
            .sort({ timestamp: -1 });

        for (const comment of comments) {
            const image = await Image.findOne({ _id: comment.image_id }).lean({virtuals:true});
            comment.image = image;
        }

        return comments;
    }
};