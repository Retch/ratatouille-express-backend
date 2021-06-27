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
            // Send created customer to client
            res.json(customer);
        })
        .catch(error => res.status(400).send(error))
};

exports.findAll = (req, res) => {
    Recipe.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(recipes => {
            res.json(recipes);
        })
        .catch(error => res.status(400).send(error))
};

exports.findById = (req, res) => {
    Recipe.findById(req.params.recipeId,
        {attributes: { exclude: ["createdAt", "updatedAt"] }}
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

exports.update = (req, res) => {
    return Recipe.findById(req.params.recipeId)
        .then(
            recipe => {
                if(!recipe){
                    return res.status(404).json({
                        message: 'Recipe Not Found',
                    });
                }
                return recipe.update({
                    name: req.body.name,
                    age: req.body.age
                })
                    .then(() => res.status(200).json(recipe))
                    .catch((error) => res.status(400).send(error));
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

            return recipe.destroy()
                .then(() => res.status(200).json({message: "Destroy successfully!"}))
                .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
};

exports.findMyCreated = (req, res) => {
    Recipe.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
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