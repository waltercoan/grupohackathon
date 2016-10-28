var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').
	create({'defaultLayout':'main'});

var port = process.env.PORT || 80;

app.use(bodyParser.urlencoded());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get('/',function(req,res){
	res.render('home');
});

app.listen(port,function(){
	console.log(" to rodando");
});