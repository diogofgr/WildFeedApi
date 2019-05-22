const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const createToken = (auth) => {
    return jwt.sign(
        { id: auth.id },
        process.env.JWT_KEY,
        {
            expiresIn: 60 * 120,
        }
    );
};

const generateToken = (req, res, next) => {
    req.token = createToken(req.auth);
    next();
};

const sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
};

// headers Authorization: Bearer EAAeCewf...
router.get('/facebook',
    passport.authenticate('facebook-token', { session: false }),
    function (req, res, next) {
        // do something with req.user
        if (!req.user) {
            res.sendStatus(401, 'User Not Authenticated')
        } else {
            // prepare token for API
            req.auth = {
                id: req.user.id
            };
            
            next();
        };
    }, generateToken, sendToken)

  module.exports = router;