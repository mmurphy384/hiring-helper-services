const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const subscription = require('../models/Subscription');
const config = require('../config');

module.exports = server => {
  // Get Subscriptions
  server.get('/subscriptions', async (req, res, next) => {
    try {
      const subscriptions = await Subscription.find({});
      res.send(Subscriptions);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get Single Subscription
  server.get('/subscriptions/:id', async (req, res, next) => {
    try {
      const subscription = await Subscription.findById(req.params.id);
      res.send(subscription);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no Subscription with the id of ${req.params.id}`
        )
      );
    }
  });

  // Add Subscription
  server.post(
    '/subscriptions',
    //rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      const { name} = req.body;

      const subscription = new Subscription({
        name
      });

      try {
        const newSubscription = await subscription.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  // Update Subscription
  server.put(
    '/subscriptions/:id',
    //rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      try {
        const subscription = await Subscription.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no Subscription with the id of ${req.params.id}`
          )
        );
      }
    }
  );

  // Delete Subscription
  server.del(
    '/subscriptions/:id',
    //rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const subscription = await Subscription.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no Subscription with the id of ${req.params.id}`
          )
        );
      }
    }
  );
};