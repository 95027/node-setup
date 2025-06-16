"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdRule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdRule.init(
    {
      adId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      ageMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ageMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true, // "male", "female", or null for any
      },

      // 📅 Days & time window
      daysOfWeek: {
        type: DataTypes.STRING,
        allowNull: true, // e.g. "Sun,Mon,Fri"
      },
      timeStart: {
        type: DataTypes.TIME,
        allowNull: true, // e.g. "16:00"
      },
      timeEnd: {
        type: DataTypes.TIME,
        allowNull: true, // e.g. "17:00"
      },
    },
    {
      sequelize,
      modelName: "AdRule",
    }
  );
  return AdRule;
};
