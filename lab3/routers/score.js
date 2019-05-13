var express = require("express");
var router = express.Router();
var users = require("./../model/leader_table.json");
var fs = require("fs");

router.get("/", function(req,res,next){
	var sorted = users.sort(function compare(a, b) {
      	var aVal = a.score;
      	var bVal = b.score;

      	if (aVal > bVal) {
        	return -1;
      	}
      	if (aVal < bVal) {
        	return 1;
      	}
      		return 0;
    	});

	res.render("score", {
		title:"Таблица рекордов",
		users: sorted, 
		css: '/css/main.css',
		js: '../js/score.js',
	})
})


module.exports = router;