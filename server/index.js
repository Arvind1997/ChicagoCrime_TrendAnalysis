const express = require('express')
const boddParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const db = require('./db')
const app = express()
const port = process.env.PORT || 3001;

app.use(boddParser.json())
app.use(boddParser.urlencoded({ extended: true }))
app.use(expressSession({ secret: 'mySecretKey', resave: true, saveUninitialized: false }))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser('mySecretKey'))

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/registe', (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    const query = 'INSERT INTO login (`userName`, `password`) VALUES (?, ?)';
    const query2 = 'SELECT * from login WHERE userName = ?';

    db.query(query2, [userName], (err, result) => {
        if(err) { throw err; }
        if(result.length > 0) {
            res.send({ message: 'Username already exists' });
        }
        if(result.length === 0) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            db.query(query, [userName, password],(err, result) => {
                if(err) { throw err; } 
                res.send({ message: 'User created!' })
            })
        } 
    })
})

app.post('/login', (req, res, next) => {
 passport.authenticate('local', (user, err) => {

    if(!user) { res.send('No user exists') }
    if (user) {
        req.login(user, (err) => {
            if (err) { throw err; }
            res.send("User logged in.");
            console.log(user)
        })
    }
 })(req, res, next);   
})

app.get('/getUser', (req, res) => {
    res.send(req.user);
})


app.get('/getUsers', (req, res) => {
    const query = 'SELECT * from area_description ORDER BY Location_ID DESC LIMIT 10';
    db.query(query, (err, result) => {
        if(err) return res.json("Error")
        res.send(result)
    })
}) 



app.listen(port, () => {
    console.log(`Started on port: ${port}`);
})


// Location Description
app.post('/location', (req, res) => {
    const values = [
    req.body.Location_ID,
    req.body.Location_Description
    ]

    const query = 'INSERT INTO area_description (`location_ID`, `location_description`) VALUES (?);';

    db.query(query, [values], (err, result) => {
        if(err) { return res.json(err) }
        return res.status(200).json("Location Added!");
    })
})

  
app.put('/updateLocation', (req, res) => {
    const q =
      "UPDATE area_Description SET `Location_Description`= ? WHERE `Location_ID` = ?";
  
      const values = [
        req.body.Location_Description,
        req.body.Location_ID
        ]
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
        
      return res.status(200).json('Location Updated!');
    });
  });
  

app.delete('/deleteLocation/:id', (req, res) => {
    const q = "DELETE FROM area_description WHERE `Location_ID`= ?";
    db.query(q, req.params.id, (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Location Deleted!");
    });
  });


// Chicago

app.get('/getChicago', (req, res) => {
    const query = 'select * from chicago_crime ORDER BY Case_number DESC LIMIT 10;';
    db.query(query, (err, result) => {
        if(err) return res.json("Error")
        res.send(result)
    })
}) 

app.post('/Chicago', (req, res) => {
    const values = [
    req.body.Case_number,
    req.body.Primary_Type,
    req.body.Arrest,
    req.body.District,    
    req.body.Year,
    req.body.Latitude,
    req.body.Longitude 
    ]

    const query = 'INSERT INTO chicago_crime (`Case_number`, `Primary_Type`, `Arrest`, `District`, `Year`, `Latitude`, `Longitude`) VALUES (?);';

    db.query(query, [values], (err, result) => {
        if(err) { return res.json(err) }
        return res.status(200).json("Crimes Details Added!");
    })
})

app.put('/updateCrime', (req, res) => {
    const q =
      "UPDATE chicago_crime SET `Arrest`= ?, `Latitude` = ?, `Longitude` = ? WHERE `Case_number` = ?";
      const values = [
        req.body.Arrest,
        req.body.Latitude,
        req.body.Longitude,
        req.body.Case_number
        ]
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
        
      return res.status(200).json('Location Updated!');
    });
  });

  app.delete('/deleteCrime/:id', (req, res) => {
    const q = "DELETE FROM chicago_crime WHERE `Case_number`= ?";
    db.query(q, req.params.id, (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Location Deleted!");
    });
  });

//   app.post('/register', (req, res) => {
//     const values = [
//     req.body.Case_number,
//     req.body.Primary_Type,
//     req.body.Arrest,
//     req.body.District,    
//     req.body.Year,
//     req.body.Latitude,
//     req.body.Longitude 
//     ]

//     const query = 'INSERT INTO chicago_crime (`Case_number`, `Primary_Type`, `Arrest`, `District`, `Year`, `Latitude`, `Longitude`) VALUES (?);';

//     db.query(query, [values], (err, result) => {
//         if(err) { return res.json(err) }
//         return res.status(200).json("Crimes Details Added!");
//     })
// })

app.post('/register', (req, res) => {
    const values = [
    req.body.username,
    req.body.password
    ]

    const query = 'INSERT INTO login (`email`, `password`) VALUES (?);';

    db.query(query, [values], (err, result) => {
        if(err) { return res.json(err) }
        return res.status(200).json("User added!");
    })
})