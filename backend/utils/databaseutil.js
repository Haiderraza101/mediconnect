const mysql= require('mysql2');

const pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'haider7516',
  database:'mediconnect'
});

module.exports = pool.promise();