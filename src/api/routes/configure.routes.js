'use strict';

// Controllers.
const controller = require('../controllers/configure.contoller');

// Middlewares.
const auth = require('../middleware/auth.middleware');

module.exports = (app) => {      
    app.use('/configure/list-all', auth, controller.getCurrentConfiguration);    
    app.use('/configure/create-route', auth, controller.createRoute);
    app.use('/configure/edit-route', auth, controller.editRoute);  
    app.use('/configure/remove-route', auth, controller.removeRoute);  
    app.use('/configure', auth, controller.configure);  
}
