const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const CryptoService = require('@services/CryptoService');
const UserRepository = require('@repo/UserRepository');

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = class AuthService {
  static init() {

    const userService = new UserRepository();

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      userService.findOne({ query: { _id: id } }, (err, user) => {
        done(err, user);
      });
    });

    passport.use(new LocalStrategy(authFields, async (email, password, done) => {
      const user = await userService.findOne({ query: { email } });

      if (!user) {
        done(true, false);
      }
      const checkPassword = await CryptoService.compare(password, user.password);

      if (!checkPassword) {
        done(true, false);
      }

      done(null, user);

    }));

    passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
      const user = await userService.findById({ query: payload._id });

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }));

    return passport;
  }

  static verify(type = 'jwt') {
    return passport.authenticate(type);
  }

  static async sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

};
