'use strict';

//Setting up knex
const env = 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    let responseObject;
    console.log('request initiated');
    knex('messages').insert({
        from: req.body.from,
        message_content: req.body.message_content,
    })
    .then((messages)=> {
        responseObject = message[0];
        knex('to').insert({
           message_id: messages[0].message_id,
           to: req.body.to
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

router.get('/received', function(req, res) {
    let responseArray;
    knex('to').where(to, req.body.user_id)
    .then((tos)=> {
        for(let i = 0; i>tos.length; i++ ) {
            let messageObject;
            knex('messages').where(message, tos[i].message_id)
            .then((messages)=> {
                messageObject = messages[i];
                messageObject.to = tos[i];
                responseArray.push(messageObject)
                return responseArray;
            })
        }
    res.status(200).send(responseArray);
    })
})


module.exports = router;
// router.get('/sent', function (req, res) {
//     knex('from').where(to, req.body.user_id)
// } )