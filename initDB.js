#!/bin/node

const mysql = require('mysql');
const fs = require('fs');
const executor = require('child_process').exec;
const exec = (command) => {
  return new Promise((resolve, reject) => {
    executor(command, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }

      return resolve(stdout, stderr)
    });
  });
};

process.env.MYSQL_ROOT_PASSWORD = 'root';
process.env.MYSQL_ROOT_HOST = '%';

exec('docker rm -f mysql && docker run --name=mysql -d ' +
  '-e MYSQL_ROOT_PASSWORD -e MYSQL_ROOT_HOST ' +
  '-p 3306:3306 ' +
  'mysql/mysql-server:5.7'
).then((stdout, stderr) => {
  console.log(`STDOUT: ${stdout}`);
  console.log(`STDERR: ${stderr}`);
}).then( () => {
  fs.readFile('./testDB.sql', 'utf8', (err, sql) => {
    if (err) {
      throw err;
    } else {
      const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        multipleStatements: true
      });
      
      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
      
        console.log('connected as id ' + connection.threadId);
        // connection.query(sql, (err) => {
        //   if (err) {
        //     throw err;
        //   } else {
        //     connection.query('select database();', (err, results) => {
        //       if (err) {
        //         throw err;
        //       } else {
        //         console.log(Object.values(...results).join());
        //         connection.end();
        //       }
        //     })
        //   }
        // })
      });

      
    }
  });
}).catch(err => console.error(err));

