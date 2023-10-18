const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req,res) => {
    res.render('auth/signup');
});

/*router.post('/signup', (req,res) => {                                                                                                                                         
    passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });
    console.log(req.body);
    res.send('received');
});
*/

router.post('/signup', isNotLoggedIn, passport.authenticate('local1', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin',isNotLoggedIn, (req,res,next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res, next);  
});

router.get('/profile',isLoggedIn, (req,res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/signin');
    });
  });

module.exports = router;