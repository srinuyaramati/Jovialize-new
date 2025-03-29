'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MassMainling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MassMainling.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    dealsFrom: {
      type: DataTypes.DataTypes
    },
    dealsTo: {
        type: DataTypes.DataTypes
    },
    createdBy: {
        type: DataTypes.INTEGER
    }
    
  }, {
    sequelize,
    modelName: 'mass_mailings',
  });
  return MassMainling;
};