module.exports = function(app) {
 
    const accounts = require('../controller/account.controller.js');

    const route = '/api/accountmgr';
 
    app.post(route + '/register', accounts.create);
 
    app.get(route, accounts.findAll);
 
    app.get(route + '/:accountId', accounts.findById);
 
    app.put(route + '/:accountId', accounts.update);
 
    app.delete(route + '/:accountId', accounts.delete);
}
