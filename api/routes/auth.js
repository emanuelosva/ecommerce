const { Router } = require('express');
const passport = require('passport');
const boom = require('boom');
const jwt = require('jsonwebtoken')
const config = require('../../config');

// Strategys
require('../../utils/auth/strategies/basic');
require('../../utils/auth/strategies/github');

// Routes
const router = Router();

router.post('/token', async (req, res, next) => {
  passport.authenticate('basic', (error, user) => {
    try {
      if (error || !user) next(boom.unauthorized());

      req.login(user, { session: false }, async (error) => {
        if (error) next(error);

        const payload = { sub: user.username, email: user.email };
        const token = jwt.sign(payload, config.auth.jwtSecret, {
          expiresIn: '15min',
        })

        return res.status(200).json({ acces_token: token });
      })
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

router.get('/github', passport.authenticate('github'));
router.get('/github/cb',
  passport.authenticate('github', { failureMessage: 'Unauthorized' }),
  (req, res, next) => {
    res.json('Ok')
  }
)

module.exports = router;
