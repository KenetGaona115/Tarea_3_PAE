const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.render('profile', {user: req.user._json, isLogged:Boolean(req.user)})
    }catch(err){
        res.send("No ha iniciado sesion")
    }
})

module.exports = router