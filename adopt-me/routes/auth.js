const express = require('express');
const passport = require('passport');
const router = express.Router();
const databaseAPI = require('../Database/databaseAPI')


router.get('/login', (_, res) => {
    res.render('login');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        const profile = databaseAPI.getUserByEmail(req.user._json.email)
        if (profile == null) {
            console.log(profile)
            databaseAPI.createUser(req.user._json.name, req.user._json.email, req.user._json.picture)
        }
        res.redirect('/profile');
    });

router.get("/logout", (req, res) => {
    req.logout();
    console.log('Sesion cerrada')
    res.redirect("/");
});

module.exports = router;