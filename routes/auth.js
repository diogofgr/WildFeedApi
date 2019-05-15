var express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// logout user
router.get('/logout',
  function(req, res){
    req.session.destroy((err) => {
      if(err) return next(err)
    
      req.logout()
    
      res.redirect('/');
    })
  });
  
module.exports = router;