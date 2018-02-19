
//this file contain all pdf conversion and manipulation related logics

exports.start = function (req,res) {

//	check(req,res);
	res.render('converter.ejs')
	console.log(__dirname);
}


exports.process = function (req,res) {

	console.log(req.file.check);

}

//validation checking for feature using
//creating function for session validation
function check(req,res) {
	if(!req.session.user)
	{
		res.render('./',{error:"Please First Login"});
	}
}
