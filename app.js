const express = require('express');
const exphbs = require('express-handlebars');
const bodyPaser = require('body-parser');
const mysql = require('mysql');
const req = require('express/lib/request');
const res = require('express/lib/response');
const Connection = require('mysql/lib/Connection');
const { route } = require('express/lib/application');

require('dotenv').config();

const app =express();
const port = process.env.PORT || 5000;

//parsing middleware
// parse application/x-www-form-urlencoded
app.use(bodyPaser.urlencoded({ extended: false}));

// parse application/json
app.use(bodyPaser.json());

//static files
app.use(express.static('public'));

//template engine
app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine','hbs');

//connection pool
const pool= mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
});
//connect to DB
pool.getConnection((err,Connection) =>{
    if(err) throw err; //not connected!
    //console.log('Mysql connected!!');
    console.log('connected as ID' + Connection.threadId);
});



const routes =require('./server/routes/user');
app.use('/',routes);


app.listen(port, () => console.log(`Listening on port ${port}`));


