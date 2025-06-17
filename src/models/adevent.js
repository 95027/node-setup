"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Ad, {
        foreignKey: "adId",
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  AdEvent.init(
    {
      adId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // null for guest visitors
      },
      eventType: {
        type: DataTypes.ENUM("impression", "click"),
        allowNull: false,
      },
      page: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AdEvent",
    }
  );
  return AdEvent;
};
