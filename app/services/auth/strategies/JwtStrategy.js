const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserRepository = require('@repo/UserRepository');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = new JwtStrategy(jwtOptions, async (payload, done) => {
  const userRepository = new UserRepository();
  const user = await userRepository.findById({ query: payload._id });

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }

});