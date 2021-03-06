'use strict';

//Setting up knex
const env = 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

const express = require('express');
const router = express.Router();


router.delete('/' , function (req, res) {
    knex('messages').where('message_id',req.body.message_id).first().del()
    .then();
    knex('message_to').where('message_id', req.body.message_id).first().del()
    .then(()=> {
        console.log('message_deleted now time to resp');
        res.status(200)
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

router.post('/', function(req, res) {
    console.log('request initiated');
    let to_user;
    let responseObject;
    console.log(req.body);
    knex('users').where('email', req.body.to).first()
    .then ( (user)=> {
        to_user = user.user_id;
        console.log(to_user);
       return knex('messages').returning('*').insert({
            from: req.body.from,
            message_content: req.body.message_content
        })
    })
    .then((messages) => {
        console.log('setting to', messages[0]);
        responseObject = messages[0];
        return knex('message_to').returning('*').insert({
           message_id: messages[0].message_id,
           to: to_user
        })
    })
    .then( (tos) => {
        responseObject.to = tos[0].to;
        return responseObject;
    })
    .then((responseObject)=> {
        res.status(200).send(responseObject)
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

router.post('/received', function(req, res) {
    console.log('received messages request initiated');
    console.log(req.body);
    let responseArray = [];
    knex('message_to').where('to', req.body.to)
    .then((tos)=> {
        console.log(tos);
        for(let i = 0; i<tos.length; i++ ) {
            let messageObject;
            knex('messages')
            .where('message_id', tos[i].message_id)
            .then((message)=> {
                console.log(message);
                messageObject = message[i];
                console.log(messageObject);
                messageObject.to = tos[i];
                responseArray.push(messageObject);
                console.log(responseArray);
                return knex('users').returning('username').where('user_id', messageObject.from).first()
            })
            .then((from_user)=> {
                responseArray[i].from_username = from_user.username;
                console.log(responseArray);
                return responseArray;
            })
            .then((responseArray)=>{
                console.log(responseArray);
                res.status(200).send(responseArray);
            })
        }
    }) 
})

router.post('/sent', function (req, res) {
    console.log('sent request initiated');
    let responseArray = []; 
    knex('messages').where('from',req.body.to)
    .then((messages)=> {
        console.log(messages);
        for(let i = 0; i<messages.length; i++) {
            responseArray.push(messages[i]);
            console.log(responseArray);
            return knex('message_to').returning('to').where('message_id', messages[i].message_id)
            .then((to)=> {
                console.log(to);
                responseArray[i].to = to.to;
                console.log(responseArray);
                return knex('users').where('user_id',to).first()
            })
            .then( (to_username) => {
                console.log(to_username);
                responseArray[i].to_username = to_username;
                return responseArray
            })
            .then((responseArray)=> {
                console.log(responseArray);
                res.status(200).send(responseArray);
            })
        }
    }) 
});






module.exports = router;
// router.get('/sent', function (req, res) {
//     knex('from').where(to, req.body.user_id)
// } )