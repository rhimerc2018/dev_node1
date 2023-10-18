const handlebars = require('handlebars');
const { Galeria } = require('../models');

module.exports = {
    async populargall() {
        const galerias = await Galeria.find().lean()
            .limit(9)
            .sort({ likes: -1 });
        return galerias;
    },
  
    async galeriaimg(viewModel) {
        const images = await viewModel.images;          
        return images;
    },

    async viewsgal(viewModel) {
        const views = await viewModel.galeria.views;     
         return views;
     },
 
     async likesgal(viewModel) {
        const likes = await viewModel.galeria.likes;     
         return likes;
     }, 

    async totalviews(viewModel) {
        const views = await viewModel.views;     
         return views;
     },
 
     async totalikes(viewModel) {
        const likes = await viewModel.likes;     
         return likes;
     }, 

     async totalcommgal(viewModel) {
        const totalcommgal = await viewModel.totalcommgal;     
         return totalcommgal;
     },

     async commentsGal(viewModel) {
        const commentsgal = await viewModel.commentsgal;     
         return commentsgal;
     },
     async commentsImg(viewModel) {
        const comentarios = await viewModel.comments;          
        return comentarios;
    },
    async totalgall(viewModel) {
        const totalgall = await viewModel.totalgall;     
         return totalgall;
     },

     async totalimg(viewModel) {
        const totalimg = await viewModel.totalimg;     
         return totalimg;
     },

    async totalprod(viewModel) {
       const totalprod = await viewModel.totalprod;
        return totalprod;
    },

    async totalcomm(viewModel) {
        const totalcomm = await viewModel.totalcomm;     
         return totalcomm;
     }
};
