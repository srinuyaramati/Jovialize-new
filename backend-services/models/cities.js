'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cities.init({
    cityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cityName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'cities',
  });
  return Cities;
};