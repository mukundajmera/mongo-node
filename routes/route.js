var mongo;
//mongo db connectivity
	//including mongodb as the package for the process
	var mongodb = require('mongodb').MongoClient;
	var URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/app';
	mongodb.connect(URL,function(error,db) {
	//connecting to the db if not throwing error
		if(error)
		{
			console.log('cannot connect');
		}
		else
		{
			mongo = db.db('app');
			console.log('connected to DB');
			
		}
	});


//login page
exports.login = function (req,res) {

	res.render('index.ejs');

}

//admin
exports.login_admin = function (req,res) {

	res.render('index_admin.ejs');

}


//block for inserting the data
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
