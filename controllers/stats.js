const { Product, Comment, Image } = require('../models');

async function imageCounter() {
    return await Image.countDocuments();

}

async function commentsCounter() {
    return await Comment.countDocuments();  

}

async function productsCounter() {
    return await Product.countDocuments();  

}

async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
    return result[0].viewsTotal;
}

async function likesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }

        }
    }]);
    return result[0].likesTotal;

}


module.exports = async () => {
    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter(),
        productsCounter()

    ])

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3],
        products: results[4]        
    }
}