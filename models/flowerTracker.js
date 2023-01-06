const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');


const FlowerTracker = sequelize.define('FlowerTracker', {
  // Model attributes are defined here
  flower_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    Rreferences: {
      model: 'flowers',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    primaryKey: true
  },
  appearance: {
    type: DataTypes.BOOLEAN
  }
}, {
    tableName: 'flower_tracker',
    timestamps: false
});

module.exports = FlowerTracker;