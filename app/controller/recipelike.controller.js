const db = require('../config/db.config.js');
const Recipe = db.recipes;
const RecipeLike = db.recipelikes;

exports.togglelike = (req, res) => {

    RecipeLike.findOne({ where: { accountId: req.body.accountId, recipeId: req.body.recipeId } }).then(recipelike => {
        if (recipelike) {
            recipelike.destroy().then(() => res.status(200).json({message: "Recipe unstarred"}));
        }
        else {
            RecipeLike.create({
                accountId: req.body.accountId,
                recipeId: req.body.recipeId
            })
                .then(recipelike => {
                    res.status(200).json({message: "Recipe starred"});
                })
                .catch(error => res.status(400).send(error))
        }
    })
    .catch(error => res.status(400).send(error))
};

exports.findMyFavorites = (req, res) => {
    RecipeLike.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(recipes => {
            console.log(recipes);
            res.send.json(recipes);
        })
        .catch(error => res.status(400).send(error))
};