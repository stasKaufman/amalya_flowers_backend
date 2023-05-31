const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');


const Flower = sequelize.define('Flower', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  old_id: {
    type: DataTypes.STRING
  },
  variety_catalog_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  breeder: {
    type: DataTypes.STRING
  },
  shape: {
    type: DataTypes.STRING
  },
  color: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  is_active: {
    type: DataTypes.BOOLEAN
  },
  inactive_reasons: {
    type: DataTypes.JSON
  }
}, {
    tableName: 'flowers',
    timestamps: false
});

module.exports = Flower;