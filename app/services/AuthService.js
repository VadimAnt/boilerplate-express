const provider = require('passport');
const jwt = require('jsonwebtoken');
const { UserModel } = require('@models');
const { LocalStrategy, JwtStrategy } = require('./auth/strategies');

const JWT_AUTHENTICATED = 'jwt';
const LOCAL_AUTHENTICATED = 'local';

module.exports = class AuthService {
  static init() {
    const userService = new UserModel();
    provider.serializeUser((user, done) => { done(null, user._id); });
    provider.deserializeUser(async (id, done) => {
      try {
        const user = await userService.findOne({ query: { _id: id } });
        if (user) {
          return done(null, user);
        }
        return done('User not find', null);
      } catch (error) {
        return done(error, null);
      }
    });

    provider.use(LocalStrategy);
    provider.use(JwtStrategy);

    return provider;
  }

  static verifyUserCred() { // LOCAL STRATEGY
    return provider.authenticate(LOCAL_AUTHENTICATED);
  }

  static isAuthenticated() { // JWT STRATEGY
    return provider.authenticate(JWT_AUTHENTICATED);
  }

  static async sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
};
