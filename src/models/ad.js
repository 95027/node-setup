"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Advertiser, {
        foreignKey: "advertiserId",
      });

      this.hasMany(models.AdRule, {
        foreignKey: "adId",
      });

      this.hasOne(models.AdMetric, {
        foreignKey: "adId",
      });
    }
  }
  Ad.init(
    {
      advertiserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      redirectUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      placement: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ad",
    }
  );
  return Ad;
};
