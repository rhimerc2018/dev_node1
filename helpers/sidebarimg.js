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
        Images.views(viewModel),
        Images.likes(viewModel),
        Images.totalprod(viewModel),
        Images.totalcomm(viewModel)
//        Images.recomiendo(viewModel)       
    ]);

    viewModel.sidebarimg = {
        stats: results[0],
        popular: results[1],
        comments: results[2],
        products: results[3],
        popularprd: results[4],
        commentsimg: results[5],
        views: results[6],
        likes: results[7],
        totalprod: results[8],
        totalcomm: results[9]
    };
    return viewModel;
}
