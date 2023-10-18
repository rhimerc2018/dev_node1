const { Galeria, Image, Product, Comment } = require('../models');

async function galleryCounter() {
    return await Galeria.countDocuments();

}

async function imageCounter() {
    return await Image.countDocuments();

}

async function commentsCounter() {
    return await Comment.countDocuments();  

}

async function productsCounter() {
    return await Product.countDocuments();  

}

async function galleryTotalViewsCounter() {
    const result = await Galeria.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
}

async function imageTotalViewsCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
}

async function likesGallTotalCounter() {
    const result = await Galeria.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }

        }
    }]);
}

async function likesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }

        }
    }]);
}

module.exports = async () => {
    const results = await Promise.all([
        galleryCounter(),
        imageCounter(),
        productsCounter(),
        commentsCounter(),
        galleryTotalViewsCounter(),
        imageTotalViewsCounter(), 
        likesGallTotalCounter(),       
        likesTotalCounter()
    ])

    return {
        galleries: results[0],
        images:    results[1],
        products:  results[2],    
        comments:  results[3],
        viewsgall:  results[4],
        views:     results[5],
        likesgall:  results[6],
        likes:     results[7]
    }
}