const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('@models/UserModel');


module.exports = class AuthService {
  static init() {

    const userService = new UserModel();

    passport.serializeUser((user, done) => { done(null, user._id) });
    passport.deserializeUser((id, done) => {
      userService.findOne({ query: { _id: id } }, (err, user) => {
        done(err, user);
      });
    });

    passport.use(require('./strategies/LocalStrategy'));
    passport.use(require('./strategies/JwtStrategy'));

    return passport;
  }

  static verify(type = 'jwt') {
    return passport.authenticate(type);
  }

  static async sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

};
