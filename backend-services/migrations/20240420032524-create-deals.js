'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deals', {
      dealId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      shortDescription: {
        type: Sequelize.TEXT
      },
      longDescription: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM(['Active', 'Inactive']),
        defaultValue: 'Inactive'
      },
      dealPrice: {
        type: Sequelize.STRING
      },
      activeFrom: {
        type: Sequelize.DATE
      },
      activeTo: {
        type: Sequelize.DATE
      },
      city: {
        type: Sequelize.INTEGER
      },
      dealType: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Deals');
  }
};