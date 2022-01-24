'use strict';

// Controllers.
const controller = require('../controllers/main.controller');

// Middlewares.
const limiter = require('../middleware/limiter.middleware');
const routing = require('../middleware/routing.middleware');
const auth = require('../middleware/auth.middleware');

module.exports = (app) => {
    app.use('/', auth, limiter, routing, controller);
}
