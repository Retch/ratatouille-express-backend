const db = require('../config/db.config.js');
const Recipe = db.recipes;

exports.create = (req, res) => {
    Recipe.create({
        name: req.body.name,
        imageurl: req.body.imageurl,
        averagetimeinminutes: req.body.averagetimeinminutes,
        difficulty: req.body.difficulty,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        categories: req.body.categories,
        creatorId: req.body.creatorId
    })
        .then(customer => {
            res.json(customer);
        })
        .catch(error => res.status(400).send(error))
};

exports.findAll = (req, res) => {
    Recipe.findAll({
        attributes: { exclude: ["updatedAt"] }
    })
        .then(recipes => {
            res.json(recipes);
        })
        .catch(error => res.status(400).send(error))
};

exports.findById = (req, res) => {
    Recipe.findById(req.params.recipeId,
        {attributes: { exclude: ["updatedAt"] }}
    )
        .then(recipe => {
                if (!recipe){
                    return res.status(404).json({message: "Recipe Not Found"})
                }
                return res.status(200).json(recipe)
            }
        )
        .catch(error => res.status(400).send(error));
};

exports.editMyCreatedRecipe = (req, res) => {
    return Recipe.findById(req.params.recipeId)
        .then(
            recipe => {
                if(!recipe){
                    return res.status(404).json({
                        message: 'Recipe Not Found',
                    });
                }
                if (recipe.creatorId == req.body.accountId) {
                    return recipe.update({
                        name: req.body.name,
                        imageurl: req.body.imageurl,
                        averagetimeinminutes: req.body.averagetimeinminutes,
                        difficulty: req.body.difficulty,
                        ingredients: req.body.ingredients,
                        preparation: req.body.preparation,
                        categories: req.body.categories
                    })
                        .then(() => res.status(200).json(recipe))
                        .catch((error) => res.status(400).send(error));
                }
                else {
                    return res.status(401).json({
                        message: 'Only the creator can update its created recipe',
                    });
                }
            }
        )
        .catch((error) => res.status(400).send(error));
};

exports.delete = (req, res) => {
    return Recipe
        .findById(req.params.recipeId)
        .then(recipe => {
            if(!recipe) {
                return res.status(400).send({
                    message: 'Recipe Not Found',
                });
            }

            if (recipe.creatorId == req.body.accountId) {
            return recipe.destroy()
                .then(() => res.status(200).json({message: "Deleted successfully!"}))
                .catch(error => res.status(400).send(error));
            }
            else {
                return res.status(401).json({
                    message: 'Only the creator can delete its created recipe',
                });
            }
        })
        .catch(error => res.status(400).send(error));
};

exports.findMyCreated = (req, res) => {
    Recipe.findAll({
        attributes: { exclude: ["updatedAt"] }
    })
        .then(recipes => {
            let createdrecipes = [];
            recipes.forEach(recipe => {
                if (recipe.dataValues.creatorId === req.body.accountId) {
                    createdrecipes.push(recipe);
                }
            })

            res.send(createdrecipes);
        })
        .catch(error => res.status(400).send(error))
}
