var mongo;
//mongo db connectivity
	//including mongodb as the package for the process
	var mongodb = require('mongodb').MongoClient;
	var URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
	mongodb.connect(URL,function(error,db) {
	//connecting to the db if not throwing error
		if(error)
		{
			console.log('cannot connect');
		}
		else
		{
			mongo = db.db('student');
			console.log('connected to DB');
			
		}
	});



///login page
exports.login = function (req,res) {

	res.render('index.ejs',{error:null});

}

//main index page
exports.home = function (req,res) {

//validation for session
		check(req,res);

		res.render('home.ejs',{"info":req.session.user});
	
}



exports.logout = function (req,res) {

	check(req,res);

req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } 
  else 
  {
    res.render('./',{error:"Successfully Logged Out"});
  }
});
}

exports.auth = function (req,res) {

//making one record to find with and operator for email and password
	mongo.collection("info").findOne({email:req.body.email,password:req.body.password} ,function (err,data) {
	    if (err) throw err;
	    
	    if(data == null)
	    {
	    	//login failed redirecting to login fail page.
	    	res.render("./",{error:"Login Failed"});
	    }
	    else
	    {
	    	//login success creating session and redirecting to home page.
	    	req.session.user = data;
	    	 res.redirect('/home');
	    }

	})

}

exports.signup = function (req,res) {

	res.render('signup.ejs');
}

exports.register = function (req,res) {

//server side validation for wrong password
	if(req.body.password != req.body.password_c)
	{
	    res.render('./',{error:"Password not matching"});
	}
	else
	{
		//inserting record
		var value = {name:req.body.name,email:req.body.email,password:req.body.password};
		mongo.collection('info').insertOne(value,function (err,result) {
			if(err) throw err;

			//showing message in login page
			res.render("./",{error:"Registered Successfully "});
		})
	}
}

exports.user_list = function (req,res) {

	check(req,res);
	mongo.collection('info').find().toArray(function(err, data){

		if(err) throw err;

		res.render('user.ejs',{'user':data});
	});

}

exports.update = function (req,res) {

//using url for parsing value 
	var url = require('url');
	var url_value = url.parse(req.url, true).query;

//for learning purpose sending variable as json from query
	// console.log(url_value.name);
	// console.log(url_value.email);
	 res.render("update.ejs",{'name':url_value.name,'email':url_value.email});

}

//function for updating in process
exports.update_process = function (req,res) {

	var search = { name: req.body.old_name , email : req.body.old_email };
  	var replace = { $set: { name: req.body.name , email : req.body.email} };
  	mongo.collection('info').updateOne(search,replace, function(err, result) {

  		if (err) throw err
  			console.log("doc updated");
  		//after updation detirection to user page again
  		res.redirect("/user");
	})
}

exports.delete = function (req,res) {

//taking names from URL so
	var url = require('url');
	var url_value = url.parse(req.url, true).query;

	var value = {name:url_value.name,email:url_value.email}

	mongo.collection("info").deleteOne(value,function (err,result) {
		if (err) throw err;

		res.redirect("/user");
	})
}

//creating function for session validation
function check(req,res) {
	if(!req.session.user)
	{
		res.render('./',{error:"Please First Login"});
	}
}
/*

 ///block for inserting the data
exports.insert_comments = function (req,res) {
	//inserting into the collections comments
	var data = {
		"name":req.body.name,
		"comment":req.body.comment,
		"email":req.body.email
	};
	mongo.collection("comments").insertOne(data,function(error,result) {
		if(error)
		{
			console.log("cannot insert");
		}
		else
		{
			console.log("success");
			res.redirect('/view');
		}
		});
}




//view comments page
exports.view = function (req,res) {
	var records;
	mongo.collection("comments").find({}).toArray(function(error, data){
		//generating all the data
	   if (error) throw error;
//cannot understand why this happened
 	 	records = data; 
//to make it accessable as variable send with name variable
		res.render('view.ejs',{"tuples" : data});
	  });

}
*/
