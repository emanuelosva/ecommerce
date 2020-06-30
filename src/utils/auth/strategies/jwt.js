const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');
const bcrypt = require('bcrypt');
const MongoLib = require('../../../lib/mongo');
const config = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.auth.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload, cb) => {
      const mogoDB = new MongoLib();

      try {
        const [user] = await mogoDB
          .getAll('users', { username: tokenPayload.sub });

        if (!user) return cb(boom.unauthorized(), false);

        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);