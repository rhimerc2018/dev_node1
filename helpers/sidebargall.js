const StatsGall = require('./statsgall');
const Galerias = require('./galerias');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async function (viewModel) {

    const results = await Promise.all([
        StatsGall(),
        Galerias.populargall(),
        Images.popular(),
        Galerias.galeriaimg(viewModel),        
        Comments.newest(),
        Comments.commentsImg(viewModel),
        Galerias.totalimg(viewModel), 
        Galerias.totalgall(viewModel),
        Images.totalprod(viewModel),   
        Images.totalcomm(viewModel),
        Galerias.viewsgal(viewModel),
        Galerias.likesgal(viewModel),
        Galerias.totalcommgal(viewModel),
        Comments.commentsGal(viewModel)
    ]);

    viewModel.sidebargall = {
        statsgall: results[0],
        populargall: results[1],
        popular: results[2],
        galeriaimg: results[3],
        comments: results[4],
        commentsimg: results[5],
        totalimg: results[6],
        totalgall: results[7],
        totalprod: results[8],
        totalcomm: results[9],
        views: results[10],
        likes: results[11],
        totalcommgal: results[12],
        commentsgal: results[13]
    }

    return viewModel;
}
