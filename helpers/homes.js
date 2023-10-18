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
        const totalviews = await viewModel.totalviews;     
         return totalviews;
     },
 
     async totalikes(viewModel) {
        const totalikes = await viewModel.totalikes;     
         return totalikes;
     }, 

     async totalcommgal(viewModel) {
        const totalcommgal = await viewModel.totalcommgal;     
         return totalcommgal;
     },

    async totalgall(viewModel) {
        const totalgall = await viewModel.totalgall;     
         return totalgall;
     },

     async totalneg(viewModel) {
        const totalneg = await viewModel.totalneg;     
         return totalneg;
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
