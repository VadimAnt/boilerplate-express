const LocalStrategy = require('passport-local').Strategy;
const CryptoService = require('@services/CryptoService');
const UserRepository = require('@repo/UserRepository');

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
};

module.exports = new LocalStrategy(authFields, async (email, password, done) => {
  const userRepository = new UserRepository();
  const user = await userRepository.findOne({ query: { email } });

  if (!user) {
    done(true, false);
  }
  const checkPassword = await CryptoService.compare(password, user.password);

  if (!checkPassword) {
    done(true, false);
  }

  done(null, user);
});