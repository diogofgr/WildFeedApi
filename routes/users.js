const express = require('express');
const router = express.Router();
const User = require(__dirname + '/../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {

  // find all users
  User.find({}, function (err, users) {
    if (err) return handleError(err);
    if (!req.user) {
      res.redirect('/auth/facebook')
    }
    res.render('users', { users });
  })
});

module.exports = router;
