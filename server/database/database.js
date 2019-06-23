const Sequelize = require('sequelize');


if (process.env.JAWSDB_MARIA_URL){
  module.exports =  new Sequelize(process.env.JAWSDB_MARIA_URL)
}
else {
  module.exports =  new Sequelize('kym', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb'
  });
}
