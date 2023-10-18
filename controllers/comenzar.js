
const handlebars = require('handlebars');
const image = require('mongoose-lean-virtuals');

const ctrl = {};
const sidebarhome = require('../helpers/sidebarhome');
const { Galeria, Image, Product, Comment, CommentProd, CommentGal } = require('../models');

ctrl.index = async (req, res) => {
      const images = await Image.find().sort({ timestamp: -1 });
      const galerias = await Galeria.find().sort({ street: 1, number: 1 });

      let viewModel = { homes: {}, galerias: {}, images: {}, totalgall: {}, totalprod: {}, totalcomm: {},  totalneg: {} };
      viewModel.galerias = galerias;

      const totgall = await Galeria.countDocuments();
      const totcomm = await CommentProd.countDocuments();
      const totneg = await Image.countDocuments();
      const totprod = await Product.countDocuments();
      const totview =  await Galeria.aggregate([{
            $group: {
                _id: '1',
                viewsTotal: { $sum: '$views' }
            }
        }]);
      const totlike = await Galeria.aggregate([{
            $group: {
                _id: '1',
                likesTotal: { $sum: '$likes' }
            }
        }]);

      viewModel.totalgall  = totgall;     
      viewModel.totalneg  = totneg;
      viewModel.totalprod = totprod;
      viewModel.totalcomm = totcomm;
      viewModel.totalviews = totview[0].viewsTotal;
      viewModel.totalikes = totlike[0].likesTotal;
      viewModel = await sidebarhome(viewModel);
      res.render('comenzar', { galeries: viewModel });
 //res.render('typeprod');    
};

module.exports = ctrl;