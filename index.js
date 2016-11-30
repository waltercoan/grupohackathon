var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').
	create({'defaultLayout':'main'});
var mysql      = require('mysql');

function dbcomm(){
	var connection = mysql.createConnection({
	  host     : 'us-cdbr-iron-east-04.cleardb.net',
	  user     : 'b177f779b931bd',
	  password : '61ce4b87',
	  database : 'ad_98dbf558a4e2e85'
	});

	connection.connect(function(err){
		if(err) {
		    console.log("Error connecting database ... nn");    
		}
	});
	return connection;
}

var port = process.env.PORT || 80;

app.use(bodyParser.urlencoded());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get('/',function(req,res){
	res.render('home');
});

app.get('/contact/add',function(req,res){
	res.render('contactform');
});

app.get('/contact',function(req,res){
	var conn = dbcomm();
	conn.query('select id,name,email,phone from contact',
		function(err,rows,fields){
			console.log(rows);

			res.render('contact',{data:rows});
		}
	);
});


app.get('/contact/update',function(req,res){
	var id = req.query.id;
	var conn = dbcomm();
	conn.query('select id,name,email,phone from contact where id = ?',
		id,		
		function(err,rows,fields){
			console.log(rows);

			res.render('contactform',{data:rows[0]});
		}
	);

});





app.post('/contact/save',function(req,res){
	console.log(req.body.id);


	var conn = dbcomm();
	if (req.body.id == 0){
	conn.query('insert into contact(name,email,phone) values(?,?,?)' ,
		[req.body.name, req.body.email, req.body.phone],
		function(err,rows,fields){
			if(err)
				console.log("Deu caca...");
		});
	}else{
		conn.query('update contact set name=?,email=?,phone=? where id = ?' ,
		[req.body.name, req.body.email, req.body.phone, req.body.id],
		function(err,rows,fields){
			if(err)
				console.log("Deu caca...");
		});

	}
	

	res.redirect('/contact');
});

app.listen(port,function(){
	console.log(" to rodando");
});