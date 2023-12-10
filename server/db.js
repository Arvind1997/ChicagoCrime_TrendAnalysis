const mysql = require('mysql2')

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,

})


db.getConnection((err, conn) => {
    if(err) console.log(err)
    else
    console.log('Connected to db!')
})

module.exports = db;