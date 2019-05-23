const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require(__dirname + '/../models/User');

const findOrCreateUser = (accessToken, refreshToken, profile, done) => (
    User.findOne({
      facebookId: profile.id 
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook
        if (!user) {
            user = new User({
                facebookId: profile.id,
                displayName: profile.displayName,
                avatar: profile._json.picture.data.url,
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    })
)

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// for external frontend apps
passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0',
    profileFields: ['id', 'displayName', 'photos']
  }, function(accessToken, refreshToken, profile, done) {
    findOrCreateUser(accessToken, refreshToken, profile, done);
  }
));
