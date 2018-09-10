const LocalStrategy = require('passport-local').Strategy;
const CryptoService = require('../../../services/CryptoService');
const { UserModel } = require('../../../models');
const { BadRequest } = require('../../../errors');

const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

module.exports = new LocalStrategy(options, async (email, password, done) => {
  try {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return done(new BadRequest('User not found'), false);
    }

    const checkPassword = await CryptoService.compare(password, user.password);

    if (!checkPassword) {
      return done(new BadRequest('User not found'), false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});
