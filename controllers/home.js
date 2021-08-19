const handlebars = require('handlebars');
const image = require('mongoose-lean-virtuals');

const ctrl = {};

const { Image } = require('../models');

const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
      const images = await Image.find().sort({ timestamp: -1 }).lean({virtuals:true});
      let viewModel = { images: []};
      viewModel.images = images;
      viewModel = await sidebar(viewModel);
      //    res.send('<h1>Social Suecia</h1>');
//      res.render('index', { images: images });
      console.log(viewModel.sidebar.comments[0].image);
      res.render('index', viewModel );

};

module.exports = ctrl;


