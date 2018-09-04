const LocalStrategy = require('passport-local').Strategy;
const CryptoService = require('@services/CryptoService');
const UserModel = require('@models/UserModel');
const BadRequest = require('../../../errors/BadRequest');

const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

module.exports = new LocalStrategy(options, async (email, password, done) => {
  const userModel = new UserModel();
  const user = await userModel.findOne({ query: { email } });

  if (!user) {
    return done(new BadRequest('Bad request'), false);
  }

  const checkPassword = await CryptoService.compare(password, user.password);

  if (!checkPassword) {
    return done(new BadRequest('Bad request'), false);
  }

  return done(null, user);
});
