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
    async function (req, res) {
        const name = req.user._json.name;
        const email = req.user._json.email;
        const picture = req.user._json.picture;
        console.log(await databaseAPI.getUserByEmail(email));
        if (await databaseAPI.getUserByEmail(email) == null) {
            console.log('Entra')
            databaseAPI.createUser(name, email, picture)
        }
        res.redirect('/profile');
    });

router.get("/logout", (req, res) => {
    req.logout();
    console.log('Sesion cerrada')
    res.redirect("/");
});

module.exports = router;