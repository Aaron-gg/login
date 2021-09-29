const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

//ejemplo multiples rutas autenticación
    router.use((req, res, next) => {
        checkAuthentication(req, res, next);
        next();
    });
// Las rutas debajo seran verificadas
router.get('/dashboard', (req, res, next) => {
    res.send('dashboard');
});

// router.get('/profile', checkAuthentication, (req, res, next) => {     // Manera de verificar una sola ruta
router.get('/profile', (req, res, next) => {
    res.render('profile');
});

function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
}

module.exports = router;