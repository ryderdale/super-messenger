const fs = require('fs');
const express = require('express'); 
const path = require('path'); 
const usersPath = path.join(__dirname, 'postgres://localhost/super-messenger');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);
app.disable('x-powered-by');


const cookieParser = require('cookie-parser');


app.use(cookieParser());


app.use(express.static('public'));
// app.use(cookieSession({
//     name: 'session-token', //name of cookie to set
//     // other cookie attributes like maxAge, expires,  domain can be set here
//     keys: ['killbasetoken']
//   }));

// function generateUserSessionToken () {
//     return require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });
// }

app.use(function(req, res, next) {
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const indexRouter = require('./routes/index');
const users = require('./routes/users');

const messages = require('./routes/messages');
// const volunteerOpps = require('./routes/volunteer-opportunities');
// const volunteers = require('./routes/volunteers');

// app.get("/", function (req, res) {
//     res.send('index.html')
// })

app.use('/', indexRouter);
app.use('/users', users);

app.use('/', messages);
// app.use('/volunteer-opportunities', volunteerOpps);
// app.use('/volunteers', volunteers);

app.use(function(req, res) {
    res.sendStatus(404);
});






app.listen(port, function() {
    console.log('Listening on port', port);
    });
     
module.exports = app;
