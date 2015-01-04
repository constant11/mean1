// vendor
var express = require('express');
var mongojs = require('mongojs');
var db = mongojs("crudtest", ["phoneBook"]);
 
var router = new express.Router();

router.get("/", function (req, res) {
	db.phoneBook.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

router.post("/", function (req, res) {
	console.log('create');
	var svc = req.body;
	if(req.body.hasOwnProperty('_id')){
		delete req.body._id;
	}
	db.phoneBook.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

router.get("/:id", function (req, res){
	var id = req.params.id;
	db.phoneBook.findOne({_id : mongojs.ObjectId(id)},
		function(err, doc){
			res.json(doc);
		});
});

router.put("/:id", function (req, res){
	var id = req.params.id;
	//console.log(req.body.name);
	console.log(id);
	// db.phoneBook.update({_id : mongojs.ObjectId(id)},
		// {$set : {name : req.body.name}},
		// function(err,doc){
			// res.json(doc);
		// }
	// );
	db.phoneBook.findAndModify(
		{query: {_id : mongojs.ObjectId(id)},
		update : {givenname : req.body.givenname, middlename : req.body.middlename,
					familyname : req.body.familyname, telno : req.body.telno, 
					cellno : req.body.cellno, birthyear : req.body.birthyear, 
					birthmonth : req.body.birthmonth, birthday : req.body.birthday, 
					preaddress : req.body.preaddress, city : req.body.city, 
					province : req.body.province, country : req.body.country }},
		function(err,doc){
			res.json(doc);
		}
	);
});


router.delete("/:id", function (req, res){
	var id = req.params.id;
	db.phoneBook.remove({_id : mongojs.ObjectId(id)},
		function(err, doc){
			res.json(doc);
		});
});
 
module.exports = router;