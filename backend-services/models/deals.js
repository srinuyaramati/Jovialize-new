'use strict';
const { Model } = require("sequelize");

const Cities = require("./cities");
const DealImages = require("./dealImages");

module.exports = (sequelize, DataTypes) => {
  class Deals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Deals.associate = function(models) {
        Deals.hasMany(models.images, {
          foreignKey: "dealId",
          as: 'deal_images'
        })
      }
    }
  }
  Deals.init({
    dealId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    longDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealPrice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealOfferPrice: DataTypes.INTEGER,
    activeFrom: {
      type: DataTypes.DATE,
      allowNull: false
    },
    activeTo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'Cities', 
        key: 'cityId'
      }
    },
    entityId: {
      type: DataTypes.INTEGER
    },
    dealType: DataTypes.INTEGER,
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updatedBy: DataTypes.INTEGER,
    deleted: DataTypes.STRING,
    deletedBy: DataTypes.INTEGER,
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealAuthorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealAuthorDesignation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerServiceAvailable: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'deals',
  });
  return Deals;
};