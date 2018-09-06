const passport = require('passport');
const jwt = require('jsonwebtoken');
const { UserModel } = require('@models');
const { LocalStrategy, JwtStrategy } = require('./auth/strategies');

module.exports = class AuthService {
  static init() {
    const userService = new UserModel();
    passport.serializeUser((user, done) => { done(null, user._id); });
    passport.deserializeUser((id, done) => {
      userService.findOne({ query: { _id: id } }, (err, user) => {
        done(err, user);
      });
    });

    passport.use(LocalStrategy);
    passport.use(JwtStrategy);

    return passport;
  }

  static verify(type = 'jwt') {
    return passport.authenticate(type);
  }

  static async sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
};
