const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cities = require("./cities.js")(sequelize, Sequelize);
db.admin = require("./admin.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);
db.deals = require("./deals.js")(sequelize, Sequelize);
db.recentlyViewedDeals = require("./recentlyViewedDeals.js")(sequelize, Sequelize);
db.roles = require("./userRoles.js")(sequelize, Sequelize);
db.dealImages = require("./dealImages.js")(sequelize, Sequelize);
db.massMailing = require("./massMailing.js")(sequelize, Sequelize);
db.banners = require("./banners.js")(sequelize, Sequelize);

// join for admin and cities for city name 
db.admin.belongsTo(db.cities, {
  foreignKey: "cityId",
  as: "cities"
});

// join for admin and role for role name
db.admin.belongsTo(db.roles, {
  foreignKey: "roleId",
  as: "roles"
});

// 
db.deals.belongsTo(db.cities, {
  foreignKey: "city",
  as: "cities"
});

// 
db.users.belongsTo(db.cities, {
  foreignKey: "cityId",
  as: "userCities"
});

db.deals.belongsTo(db.dealImages, {
  foreignKey: "dealId",
  as: "images"
});

db.deals.hasMany(db.dealImages, {
  foreignKey: "dealId",
  as: "allImages"
})

db.recentlyViewedDeals.belongsTo(db.deals, {
  foreignKey: "dealId",
  as: "recentlyViewedDeals"
});

db.recentlyViewedDeals.belongsTo(db.dealImages, {
  foreignKey: 'dealId',
  as: "dealImages",
})

// db.dealImages.belongsTo(db.deals, {
//   foreignKey: "dealId",
//   as: "individualDealAllImages",
// })

module.exports = db;