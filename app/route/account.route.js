module.exports = function(app) {
 
    const customers = require('../controller/account.controller.js');

    const route = '/api/accountmgr';
 
    app.post(route + '/register', customers.create);
 
    app.get(route, customers.findAll);
 
    app.get(route + '/:accountId', customers.findById);
 
    app.put(route + '/:accountId', customers.update);
 
    app.delete(route + '/:accountId', customers.delete);
}
