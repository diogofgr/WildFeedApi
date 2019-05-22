const expressJwt = require('express-jwt');

const authenticateWithJWT = expressJwt({
    secret: process.env.JWT_KEY,
    requestProperty: 'auth',
    getToken: function(req) {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    }
  });

  module.exports = authenticateWithJWT;