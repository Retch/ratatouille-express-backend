module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define('Recipe', {
        id: {
            type : Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING(255),
        imageurl: Sequelize.STRING(128),
        averagetimeinminutes: Sequelize.SMALLINT,
        difficulty: Sequelize.STRING(24),
        ingredients: Sequelize.STRING(1024),
        preparation: Sequelize.STRING(4096),
        categories: Sequelize.STRING(128)
    });

    return Recipe;
}
