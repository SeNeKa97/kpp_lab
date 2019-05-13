var express = require("express");
var router = express.Router();
var users = require("./../model/leader_table.json");
var fs = require("fs");

router.get("/:id([0-9]{1,})", function(req,res,next){
	var id = req.params.id;
	console.log(id);
	var person = users.filter(function(people){
		return id==people.id;
	})[0];

	res.render("tetris", {
		title:"Игра",
		person: person.id, 
		css: '/css/main.css',
		js: '../js/game.js',
		jsGame: '../js/game_logic.js',
		jsControls: '../js/controls.js',
		jsRender: '../js/render.js'
	})
})




router.get("/gethiscore", function(req,res,next){
	var highestScore = 0;
	if(users){
    	highestScore = users.sort(function compare(a, b) {
      	var aVal = a.score;
      	var bVal = b.score;

      	if (aVal > bVal) {
        	return -1;
      	}
      	if (aVal < bVal) {
        	return 1;
      	}
      		return 0;
    	})[0].score;
  	};

  	res.end(""+highestScore);
})

router.post("/savehiscore", function(req,res,next){
	const body = req.body;
	var score = body.score;
	var id = body.id;
	

	var person = users.filter(function(people){
		return id===people.id;
	})[0];

	person.score = score;
	fs.writeFile("model/leader_table.json",JSON.stringify(users, null, 4), function (err) {
        if (err) throw err;
    });
    res.end("");
});

module.exports = router;