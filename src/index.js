const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 



let db = new sqlite3.Database(':memory:',(err)=>{
	if (err){
		return console.error(err.message);
	}
	console.log('db connection is working');
});

db.run('CREATE TABLE contact(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, UserName VARCHAR(30) NOT NULL UNIQUE,FirstName VARCHAR(64), SurName VARCHAR(64),phone INT);')

db.close((err)=>{
	if(err){
		return console.error("Problem with closing db "+err.message);
	}
	console.log('db closed without problems');
});






 app.get('/',(req,res)=>{
    res.send("Api root");
 });

//create
app.post('/create_Contact/:UserName/:FirstName/:SurName/:phone',(req,res)=>{
	db.run('INSERT INTO contact(UserName,FirstName,SurName,phone) VALUES ("'+req.params.UserName+'","'
	+req.params.FirstName+'","'+req.params.SurName+'",'+req.params.phone+');');
	res.send('created');

});


//retrieve
app.get('/get_Contact/:UserName',(req,res)=>{
	reply = db.run('SELECT * FROM contact WHERE UserName ="'+req.params.UserName+'";');
	res.send('hitting example route' + reply);
});
//update
app.put('/update_Contact/:UserName/:phone',(req,res)=>{

	db.run('UPDATE contact SET phone='+ req.params.phone +' WHERE UserName="'+req.params.UserName+'";'); 
	res.send("updated");
});

//delete
app.delete('/delete_Contact/:UserName',(req,res)=>{

	db.run('DELETE FROM contact WHERE UserName="'+req.params.UserName+'";',function(err){
		if(err){
			return console.error(err.message);
		}
		console.log('Row deleted');
	});
	res.send('send');
});


const port = process.env.PORT||5000;
app.listen(port,()=>console.log('trugna'));