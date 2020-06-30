const { Router } = require('express');
const passport = require('passport');
const boom = require('boom');
const jwt = require('jsonwebtoken')
const config = require('../../config');

// Basic strategy
require('../../utils/auth/strategies/basic');

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

module.exports = router;
