'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 250],
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
    },
    {
      hooks: {
        afterFind: reviews => {
          if (!reviews[0]) {
            reviews.dataValues.createdAt = new Date(
              reviews.dataValues.createdAt,
            ).toUTCString();
            reviews.dataValues.updatedAt = new Date(
              reviews.dataValues.updatedAt,
            ).toUTCString();
            return reviews;
          }

          reviews = reviews.map(review => {
            review.dataValues.createdAt = new Date(
              review.dataValues.createdAt,
            ).toUTCString();
            review.dataValues.updatedAt = new Date(
              review.dataValues.updatedAt,
            ).toUTCString();
            return review;
          });
        },
      },
    },
  );

  Review.associate = ({ Book }) => {
    Review.belongsTo(Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'Book',
    });
  };

  return Review;
};
