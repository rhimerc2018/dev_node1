const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const helpers = require('../lib/helpers');

//passport.use('local.signin', new LocalStrategy({
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const user = await User.findOne({username});
    if (!user) {
        //        return done(null, false, req.flash('message', 'El usuario no existe'));
        return done(null, false, { message: 'El usuario no existe' });
    } else {
         //           return done(null, user, req.flash('success', 'Bienvenido ' + user.username));

        const validPassword = await user.matchPassword(password);
        //        const validPassword = await helpers.matchPassword(password,user.password);
        
        if (validPassword) {
 //       return done(null, user, req.flash ('error_msg', 'Passord incorrecta' ) );
            done(null, user, req.flash('success', 'Bienvenido ' + user.username));
        } else {
            done(null, false, { message: 'Passord incorrecta' });
            // done(null, false, req.flash('message', 'Passord incorrecta'));
        }

    }
}));

passport.use('local1', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const newUser = new User(req.body);

    newUser.typeuser = "nayuser";

    newUser.password = await helpers.encryptPassword(password);
    // const result = await pool.query('INSERT INTO users1 SET ?', [newUser]);
     const result = await newUser.save();
    newUser.id = result.insertId;
    
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);

});

passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});