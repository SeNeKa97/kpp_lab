var express = require('express');
var router = express.Router();
var users = require("./../model/users");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("users", {
    title:"Пользователи",
    js:"javascripts/users.js",
    users:users
  });
});

module.exports = router;
