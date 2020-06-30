const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const boom = require('boom');
const MongoLib = require('../../../lib/mongo');
const config = require('../../../config');

passport.use(new GitHubStrategy(
  {
    clientID: config.auth.githubId,
    clientSecret: config.auth.githubSecret,
    callbackURL: `http://localhost:${config.port}/api/auth/github/cb`
  },

  async (accesToken, refreshToken, profile, cb) => {
    const mongoDB = new MongoLib();

    try {
      const [user] = await mongoDB
        .getAll('users', { githubId: profile.id })

      if (!user) return cb(boom.unauthorized(), false)

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }

));
