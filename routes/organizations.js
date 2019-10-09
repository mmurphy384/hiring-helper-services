const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Organization = require('../models/Organization');
const config = require('../config');

module.exports = server => {
  // Get Organizations
  server.get('/organizations', async (req, res, next) => {
    try {
      const organizations = await Organization.find({});
      res.send(organizations);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get Single Organization
  server.get('/organizations/:id', async (req, res, next) => {
    try {
      const organization = await Organization.findById(req.params.id);
      res.send(organization);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no organization with the id of ${req.params.id}`
        )
      );
    }
  });

  // Add Organization
  server.post(
    '/organizations',
    //rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      const { name, email, balance } = req.body;

      const organization = new Organization({
        name,
        email,
        website,
        subscriptionId
      });

      try {
        const newOrganization = await organization.save();
        res.send(201);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  // Update Organization
  server.put(
    '/organizations/:id',
    //rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errors.InvalidContentError("Expects 'application/json'")
        );
      }

      try {
        const organization = await Organization.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(200);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no Organization with the id of ${req.params.id}`
          )
        );
      }
    }
  );

  // Delete Organization
  server.del(
    '/organizations/:id',
    //rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const organization = await Organization.findOneAndRemove({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no Organization with the id of ${req.params.id}`
          )
        );
      }
    }
  );
};