'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evaluations.init({
    healthId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disease: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senior: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    obesity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    activity:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    WHR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BMI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BMR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    glucose: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    SBP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DBP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, 
  {
    sequelize,
    modelName: 'Evaluations',
  }
  );
  return Evaluations;
};