const { Sequelize } = require('sequelize');
// amalya_flowers_production
// amalya_flowers_development
const sequelize = new Sequelize(
   process.env.DB_NAME || 'amalya_flowers_production', 
   process.env.DB_USER_NAME || 'stas', 
   process.env.DB_PASSWORD || 'jsad4ldsfmJJJ222d', {
    host: process.env.DB_HOST || 'awseb-e-mxdmp3rtbx-stack-awsebrdsdatabase-s0nascw4t7lr.cdpdls0qffvp.us-east-1.rds.amazonaws.com',
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