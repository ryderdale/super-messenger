'use strict';

//Setting up knex
const env = 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
// const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');

// router.use(cookieParser());

// router.use(cookieSession({
//     name: 'session-token', //name of cookie to set
//     // other cookie attributes like maxAge, expires,  domain can be set here
//     keys: ['some_secure_key']
//   }));

// router.post('/', function(req, res) {
//     console.log('Request body:', req.body);
//     knex('users').insert(req.body)
//         .then(() => {
//             return knex('users').where('email',req.body.email).andWhere('password',req.body.password)
//         })
//         .then((user_object)=> {
//             res.status(200).send(user_object)
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).send({ error });
//       });
// });


router.post('/', function(req, res) {
    console.log('request initiated')
    bcrypt.hash(req.body.password, 12)
    .then( (hashed_password) => {
        return knex('users').insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            hashed_password: hashed_password
        });
    })
    .then(() => {
        return knex('users').where('username', req.body.username)
    })
    .then((user_object)=> {
        res.status(200).send(user_object)
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

router.post("/login", function (req, res) {
    knex('users').where('email', req.body.email).first()
    .then((user_graph)=> {
        return bcrypt.compare(req.body.password, user_graph.hashed_password)
    })
    .then(()=> {
        console.log('password matched');
        return knex('users').where('email', req.body.email) 
    })
    .then((user_graph)=> {
        // req.session.user = user_graph[0];
        // console.log(req.session.user);
        res.status(200).send(user_graph)
    })
    .catch(bcrypt.MISMATCH_ERROR, (error) => {
        res.send({error: "incorrect pasword"});
        console.log('Password error:', error);
    }) 
    .catch((error) => {
        res.status(500).send(error);
    })
    
}) 




module.exports = router;