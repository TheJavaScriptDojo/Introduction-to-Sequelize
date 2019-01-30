'use strict';
const Op = require('sequelize').Op;

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 250],
        },
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 13],
        },
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
        },
      },
    },
    {
      hooks: {
        afterFind: books => {
          if (!books[0]) {
            books.dataValues.createdAt = new Date(
              books.dataValues.createdAt,
            ).toUTCString();
            books.dataValues.updatedAt = new Date(
              books.dataValues.updatedAt,
            ).toUTCString();
            return books;
          }

          books = books.map(book => {
            book.dataValues.createdAt = new Date(
              book.dataValues.createdAt,
            ).toUTCString();
            book.dataValues.updatedAt = new Date(
              book.dataValues.updatedAt,
            ).toUTCString();
            return book;
          });
        },
      },
      scopes: {
        nonFiction: {
          where: {
            genre: {
              [Op.in]: ['Biography', 'Memoir', 'Essay', 'Textbook'],
            },
          },
        },
        fiction: {
          where: {
            genre: {
              [Op.in]: ['Fable', 'Fiction', 'Mythology', 'Adventure'],
            },
          },
        },
      },
    },
  );

  Book.associate = ({ Review }) => {
    Book.hasMany(Review, {
      foreignKey: 'bookId',
      as: 'Reviews',
    });
  };

  return Book;
};
