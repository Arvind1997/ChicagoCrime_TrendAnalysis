const db = require('./db')
const bcrypt = require('passport-local')
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const query = 'SELECT * from login where email = ?';
            db.query(query, [username], (err, result) => {
                if(err) {throw err;}
                if(result.length === 0) {
                    return done(null, false)
                }
                else {
                    return done(result.email, true)
                }
            })
        })
    )


    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((id, done) => {
        const query = "SELECT * from project_adt.login where id = ?";
        db.query(query, [id], (err, result) => {
            if(err) {throw err;}
            const userInfo = {
                id: result[0].id,
                email: result[0].email
            }
            done(null, userInfo)
        })
    })

}