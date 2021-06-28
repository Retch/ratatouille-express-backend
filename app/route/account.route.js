module.exports = function(app) {
 
    const accounts = require('../controller/account.controller.js');

    const route = '/api/accountmgr';
 
    
    app.post(route + '/register', accounts.create);
 
    app.get(route, accounts.findAll);
 
    app.get(route + '/:accountId', accounts.findById);
 
    app.post(route + '/newpw', accounts.newpassword);

    app.post(route + '/login', accounts.login);
 
    app.delete(route + '/:accountId', accounts.delete);
}
