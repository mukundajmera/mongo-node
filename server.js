//express server
var express = require('express');
//making function call modular from route js
var routes = require('./routes/route.js')
//parsing json need this library
var bodyParser = require('body-parser');
//port is for binding it
var port = process.env.PORT || 80;

var app = express();
//setting template to views as ejs
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:false
}))


//public domain
app.get('/',routes.login);
//admin domain
app.get('/admin',routes.login_admin);

//direct linking fro view page
app.get('/view',routes.view);


//to get comments from post request and call same name insert_comments fx
app.post('/insert_comments',routes.insert_comments);

app.listen(port,function(){
	console.log('Listening on port '+port);
})