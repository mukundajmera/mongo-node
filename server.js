//express server
var express = require('express');
//making function call modular from route js
var routes = require('./routes/route.js')
//parsing json need this library
var bodyParser = require('body-parser');

//importing package for session
var session = require('express-session');

//path addition
path = require('path');
//port is for binding it
var port = process.env.PORT || 80;

var app = express();

app.use(session({secret: 'mukund',resave: true,saveUninitialized: true}));


//setting template to views as ejs
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:false
}))

//both have same meaning here either by absolute or taking through relative
//app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));

//index or main root page of the website
app.get('/',routes.login);
//link for home page
app.get('/home',routes.home);



//direct linking for logout page
app.get('/logout',routes.logout);

app.post('/login_check',routes.auth)

//list all user details
app.get('/user',routes.user_list)


//dispay requ from update page
app.get('/update',routes.update)


//display requ from update page
app.post('/updating',routes.update_process)

//for signing in the user
app.get('/signup',routes.signup);

//for inserting the user info in the db
app.post('/signup',routes.register);


app.get('/delete',routes.delete);

// to get comments from post request and call same name insert_comments fx
// app.post('/insert_comments',routes.insert_comments);

app.listen(port,function(){
	console.log('Listening on port '+port);
})



// //making session availabe in all the templates 
// app.use(function(req, res, next) {
//   res.locals.user = req.session.user;
//   next();
// });
