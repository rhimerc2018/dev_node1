const handlebars = require('handlebars');
const { Image } = require('../models');

module.exports = {
    async popular() {
        const images = await Image.find().lean()
            .limit(3)
            .sort({ likes: -1 });
        return images;
    },

    async views(viewModel) {
       const views = await viewModel.image.views;     
        return views;
    },

    async likes(viewModel) {
       const likes = await viewModel.image.likes;     
        return likes;
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
