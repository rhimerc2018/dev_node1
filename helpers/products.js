const handlebars = require('handlebars');
const image = require('mongoose-lean-virtuals');

const { Product, Image } = require('../models');

module.exports = {

    async newestprod() {
        const products = await Product.find().lean()
            .limit(5)
            .sort({ timestamp: -1 });
        for (const product of products) {
            const image = await Product.findOne({ _id: product .image_id }).lean({virtuals:true});
            product.image = image;
        }
        return products;
    },
    
    async popular(viewModel) {
        const productos = await viewModel.products;          
        return productos;
    },

    async views(viewModel) {
       const views = await viewModel.product.views;     
        return views;
    },

    async likes(viewModel) {
       const likes = await viewModel.product.likes;     
        return likes;
    },

    async commprod(viewModel) {
        const totprodcomm = await viewModel.totprodcomm;     
         return totprodcomm;
     } 
};