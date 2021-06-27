module.exports = (sequelize, Sequelize) => {
    const RecipeLike = sequelize.define('Account_has_liked_Recipe', {
        id: {
            type : Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        recipeId: Sequelize.BIGINT,
        accountId: Sequelize.BIGINT
    });

    return RecipeLike;
}
