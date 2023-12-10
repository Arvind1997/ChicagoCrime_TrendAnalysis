const mysql = require('mysql2')

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'project_adt',

})


db.getConnection((err, conn) => {
    if(err) console.log(err)
    else
    console.log('Connected to db!')
})

module.exports = db;