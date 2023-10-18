const Galerias = require('./galerias');
const Images = require('./images');
const Comments = require('./comments');
const Homes = require('./homes');
const statshome = require('./statshome');

module.exports = async function (viewModel) {

    const results = await Promise.all([
        statshome(),
        Galerias.populargall(),
        Images.popular(),
        Galerias.galeriaimg(viewModel),        
        Comments.newest(),
        Comments.commentsImg(viewModel),
        Homes.totalneg(viewModel), 
        Galerias.totalgall(viewModel),
        Images.totalprod(viewModel),   
        Images.totalcomm(viewModel),
        Homes.totalviews(viewModel),
        Homes.totalikes(viewModel),
        Galerias.totalcommgal(viewModel)
    ]);

    viewModel.sidebarhome = {
        statshome: results[0],
        populargall: results[1],
        popular: results[2],
        galeriaimg: results[3],
        comments: results[4],
        commentsimg: results[5],
        totalneg: results[6],
        totalgall: results[7],
        totalprod: results[8],
        totalcomm: results[9],
        totalviews: results[10],
        totalikes: results[11],
        totalcommgal: results[12]
    }
    return viewModel;
}