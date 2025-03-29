'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recently_viewed_deals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recently_viewed_deals.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dealId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'recently_viewed_deals',
  });
  return recently_viewed_deals;
};