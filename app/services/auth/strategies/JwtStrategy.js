const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserModel = require('@models/UserModel');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = new JwtStrategy(options, async (payload, done) => {
  const userModel = new UserModel();
  const user = await userModel.findById({ query: payload._id });

  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }

});