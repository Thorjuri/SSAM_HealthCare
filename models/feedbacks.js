'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedbacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedbacks.init({
    feedbackId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    statusCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exerType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FITT: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    cautions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'Feedbacks',
  }
  );
  return Feedbacks;
};