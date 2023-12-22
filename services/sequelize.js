const { Sequelize } = require('sequelize');
// amalya_flowers_production
// amalya_flowers_development
const sequelize = new Sequelize(
   process.env.DB_NAME || 'amalya_flowers_production', 
   process.env.DB_USER_NAME || 'stas', 
   process.env.DB_PASSWORD || 'kep6MRY4byd6qnz.kzu', {
    host: process.env.DB_HOST || 'amalya-flowers.cdpdls0qffvp.us-east-1.rds.amazonaws.com',
    dialect:'mysql'
  });

sequelize.authenticate().then(() => {
   // load Associations.
    require('../models/sequelizeAssociations')
    console.log('Connection to database has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

  module.exports = sequelize;
