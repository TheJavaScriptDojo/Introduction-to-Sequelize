'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.ENUM,
        values: [
          'Tragedy',
          'Adventure',
          'Fiction',
          'Fable',
          'Mystery',
          'Mythology',
          'Biography',
          'Memoir',
          'Essay',
          'Textbook',
        ],
        defaultValue: 'Essay',
      },
      isbnNo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pages: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('Books'),
};
