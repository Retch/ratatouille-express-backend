const env = require('./env.js');

const Sequelize = require('sequelize');
let sequelize = null;
if (process.env.HOST && process.env.PORT && process.env.USER && process.env.PASS && process.env.DB) {
  sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: env.dialect,
    operatorsAliases: false,
  
    pool: {
      max: env.pool.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }
  });
}
else {
sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.accounts = require('../model/account.model.js')(sequelize, Sequelize);
db.recipes = require('../model/recipe.model.js')(sequelize, Sequelize);
db.recipelikes = require('../model/recipelike.model.js')(sequelize, Sequelize);

db.recipes.belongsToMany(db.accounts, {
  as: 'Recipes',
  through: db.recipelikes,
  foreignKey: 'recipeId'
});
db.accounts.belongsToMany(db.recipes, {
  as: 'Accounts',
  through: db.recipelikes,
  foreignKey: 'accountId'
});

db.recipes.belongsTo(db.accounts, { foreignKey: "creatorId" });

module.exports = db;