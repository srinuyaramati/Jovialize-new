
'use strict';
const sequelize = require('sequelize');
const DataTypes = require('sequelize');

const Deals = sequelize.define(
    'Deals',
    {
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
          allowNull: false
        },
        dealType: DataTypes.INTEGER
    },
    {}
);

const DealImages = sequelize.define(
    'deal_images',
    {
        imageId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        imageName: DataTypes.STRING,
        dealId: DataTypes.INTEGER,
        createdDate: DataTypes.DATE
    }
)

Deals.hasMany(DealImages, {as: dealImages});

DealImages.belongsTo(Deals, {
    foreignKey: "dealId",
    as: "images",
  });
