"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdMetric extends Model {
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
    }
  }
  AdMetric.init(
    {
      adId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      impressions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "AdMetric",
    }
  );
  return AdMetric;
};
