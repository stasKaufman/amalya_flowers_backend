const Flower = require('./flowers')
const FlowerTracker = require('./flowerTracker')
const User = require('./user')

// Flower
Flower.hasMany(FlowerTracker, { foreignKey: 'flower_Id' });

// FlowerTracker
FlowerTracker.belongsTo(Flower, { foreignKey: 'flower_Id' });