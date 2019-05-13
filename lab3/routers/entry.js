var express = require("express");
var router = express.Router();
var users = require("./../model/leader_table.json");
var fs = require("fs");

router.get("/", function(req,res,next){
	console.log("what is going on");
	res.render("entry", {
		title:"Войти в игру",
		css: '/css/main.css',
		js: '../js/entry.js'
	})
})

router.post("/entry", function(req,res,next){
	var body = req.body;

	var newUser = {
		"id":users.length+1,
		"name":body.name,
		"score":0
	}
	users.push(newUser);
	fs.writeFile("model/leader_table.json", JSON.stringify(users, null, 4), function (err) {
        if (err) throw err;
    });
    console.log("what is going on");
    res.end(""+newUser.id);
})

module.exports=router;