const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { UserModel } = require('@models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = new JwtStrategy(options, async (payload, done) => {
  try {
    const userModel = new UserModel();
    const user = await userModel.findById({ query: payload._id });

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, null);
  }
});
