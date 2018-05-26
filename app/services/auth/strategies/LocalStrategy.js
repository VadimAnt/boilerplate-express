const LocalStrategy = require('passport-local').Strategy;
const CryptoService = require('@services/CryptoService');
const UserModel = require('@models/UserModel');

const options = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

module.exports = new LocalStrategy(options, async (email, password, done) => {
  const userModel = new UserModel();
  const user = await userModel.findOne({ query: { email } });

  if (!user) {
    done(true, false);
  }
  const checkPassword = await CryptoService.compare(password, user.password);

  if (!checkPassword) {
    done(true, false);
  }

  done(null, user);
});