module.exports = function(app) {

    const recipes = require('../controller/recipe.controller.js');
    const recipelike = require('../controller/recipelike.controller.js');

    const route = '/api/recipes';

    app.post(route + '/create', recipes .create);

    app.get(route, recipes.findAll);

    app.get(route + '/:recipeId', recipes.findById);

    app.put(route + '/:recipeId', recipes.update);

    app.delete(route + '/:recipeId', recipes.delete);

    app.post(route + '/like', recipelike.togglelike);

    app.post(route + '/myfavorites', recipelike.findMyFavorites);
}
