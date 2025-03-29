'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DealImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DealImages.init({
    imageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imageName: DataTypes.STRING,
    dealId: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    imageOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'deal_images',
  });
  return DealImages;
};