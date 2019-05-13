var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var entryRouter = require("./routers/entry");
var gameRouter = require("./routers/game");
var scoreRouter = require("./routers/score");

var server = express();

server.set("view engine", "pug");

server.use(express.static('./public'));
server.use('/js', express.static('js'));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use("/", entryRouter);
server.use("/game", gameRouter);
server.use("/score", scoreRouter);


server.listen(3000);

module.exports = server;