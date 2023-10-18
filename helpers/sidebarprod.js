const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');
const Products = require('./products');

module.exports = async function (viewModel) {

    const results = await Promise.all([
        Stats(),
        Images.popular(),
        Comments.newest(),
        Products.newestprod(),
        Products.popular(viewModel),
        Comments.commentsImg(viewModel),
        Comments.commentsProd(viewModel),
        Products.views(viewModel),
        Products.likes(viewModel),
        Products.commprod(viewModel)  
    ]);

    viewModel.sidebarprod = {
        stats: results[0],
        popular: results[1],
        comments: results[2],
        products: results[3],
        popularprd: results[4],
        commentsimg: results[5],
        commentsprod: results[6],        
        views: results[7],
        likes: results[8],
        totcommprod: results[9]
    };

    return viewModel;
}
