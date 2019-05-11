const Sequelize = require('sequelize');

module.exports =  new Sequelize('kym', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb'
});
