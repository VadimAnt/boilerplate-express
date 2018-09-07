const provider = require('passport');
const jwt = require('jsonwebtoken');
const { UserModel } = require('@models');
const { LocalStrategy, JwtStrategy } = require('./auth/strategies');

module.exports = class AuthService {
  static init() {
    const userService = new UserModel();
    provider.serializeUser((user, done) => { done(null, user._id); });
    provider.deserializeUser((id, done) => {
      userService.findOne({ query: { _id: id } }, (err, user) => {
        done(err, user);
      });
    });

    provider.use(LocalStrategy);
    provider.use(JwtStrategy);

    return provider;
  }

  static verify(type = 'jwt') {
    return provider.authenticate(type);
  }

  static async sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
};
