var columns = 10, rows = 20; //Классические размеры стакана
var board = []; //Стакан
//var participants = require("./../model/leader_table.json");
var gameOver; //Конец игры
var linesCleared = 0; //Убрано линий
var currentScore = 0; //Счёт
var highestScore = 0; //Рекорд
var gameStepDuration; //Скорость игры в мс
var currentFigure; //Текущая фигурка
var posX, posY; //Позиция текущей фигурки
var userId;

var tetraminos = [ //Массив фигур
 [1,1,1,1], //I-образный
 [1,1,1,0,0,0,1], //J-образный
 [1,1,1,0,1],//L-образный
 [0,1,0,0, 1,1,1 ], //T-образный
 [1,1,0,0,1,1], //O-образный
 [1,1,0,0, 0,1,1], //Z-образный
 [0,1,1,0, 1,1] //S-образный
];
var colors = [ //Массив цветов
  'orange','lime', 'blue', 'cyan', 'red', 'purple','yellow'
];
var nextFigureCreated = 0; //Есть ли следующая фигурка
var nextFigure; //Следующая фигурка

function drawNewShape (currentFigure) { //Нарисовать следующую фигуру на отдельной канве
 var canvas = document.getElementById ('next-canvas');
 var ctx = canvas.getContext ('2d');
 var width = canvas.width, height = canvas.height;
 var blockWidth = width / 4, blockHeight = height / 4;
 ctx.fillStyle = 'red';
 ctx.strokeStyle = 'black';
 ctx.clearRect (0,0,width,height);
 for (var y=0; y<4; y++) {
  for (var x=0; x<4; x++) {
   if (currentFigure[y][x]) {
    ctx.fillStyle = colors[currentFigure[y][x]-1];
    ctx.fillRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
    ctx.strokeRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
   }
  }
 }
}

function generateShape () { //Сгенерировать следующую фигуру
 var id = Math.floor (Math.random()*tetraminos.length);
 var shape = tetraminos[id];
 var currentFigure = [];
 for (var y=0; y<4; y++) {
  currentFigure[y] = [];
  for (var x=0; x<4; x++) {
   var i = 4*y+x;
   if (typeof(shape[i])!='undefined' && shape[i]) currentFigure[y][x] = id+1;
   else currentFigure[y][x]=0;
  }
 }
 if (nextFigureCreated) drawNewShape(currentFigure);
 return currentFigure;
}

function newShape() { //Создать новую фигурку 4x4 в массиве currentFigure
 if (nextFigureCreated) { //Есть сохранённая
  for (var i=0; i<nextFigure.length; i++) currentFigure[i] = nextFigure[i]; 
 }
 else { //Нет сохранённой
  currentFigure = generateShape();
  nextFigureCreated = 1;
 }
 nextFigure = generateShape();
 posX = Math.floor((columns-4)/2); posY = 0; //Начальная позиция новой фигурки
}

function init() { //Очистить стакан
 for (var y=0; y<rows; ++y) {
  board[y] = [];
  for (var x=0; x<columns; x++) board[y][x] = 0;
 }
}

function countPlus (lines0) { //Подсчёт очков
 linesCleared += lines0; 
 var bonus = [0, 100, 300, 700, 1500];
 currentScore += bonus[lines0];
 //if (currentScore > highestScore) highestScore = currentScore;
 document.getElementById('scores').innerHTML = 
  "linesCleared: "+linesCleared+"<br>currentScore: "+currentScore+"<br>Record: "+highestScore;
}

function fixPosition() { //Остановить фигурку и записать её положение в board
 for (var y=0; y<4; y++) {
  for (var x=0; x<4; x++) {
   if (currentFigure[y][x]) board[y+posY][x+posX] = currentFigure[y][x];
  }
 }
}

function rotate( currentFigure ) { //Вращение текущей фигурки currentFigure против часовой стрелки
 var newCurrent = [];
 for (var y=0; y<4; y++) {
  newCurrent[y] = [];
  for (var x=0; x<4; x++) newCurrent[y][x]=currentFigure[3-x][y];
 }
 return newCurrent;
}

function clearLines() { //Проверить, есть ли заполненные линии и очистить их
 var cleared = 0;
 for (var y=rows-1; y>-1; y--) {
  var rowFilled = true;
  for (var x=0; x<columns; x++) {
   if (board[y][x]==0) {
    rowFilled = false;
    break;
   }
  }
  if (rowFilled) { //Очистить линию
   cleared++;
   for (var yy=y; yy>0; yy--) {
    for (var x=0; x<columns; x++) {
     board[yy][x]=board[yy-1][x];
    }
   }
   y++;
  }
 }
 return cleared;
}

function keyPress( key ) {
 switch ( key ) {
  case 'escape':    
   window.alert ('paused');
  break;
  case 'left':
   if (valid(-1)) --posX;
  break;
  case 'right':
   if (valid(1)) ++posX;
  break;
  case 'down':
   if (valid(0,1)) ++posY;
  break;
  case 'rotate':
   var rotated = rotate(currentFigure);
   if (valid(0,0,rotated)) currentFigure = rotated;
  break;
 }
}

function valid (offsetX,offsetY,newCurrent) { //Проверка допустимости итоговой позиции фигуры currentFigure
 offsetX = offsetX || 0;
 offsetY = offsetY || 0;
 offsetX = posX + offsetX;
 offsetY = posY + offsetY;
 newCurrent = newCurrent || currentFigure;
 for (var y=0; y<4; y++) {
  for (var x=0; x<4; x++) {
   if (newCurrent[y][x]) {
    if (typeof(board[y+offsetY])=='undefined' || typeof(board[y+offsetY][x+offsetX])=='undefined'
     || board[y+offsetY][x+offsetX]
     || x+offsetX<0 || y+offsetY>=rows || x+offsetX>=columns) {
     if (offsetY==1) gameOver=true; //Конец игры, если текущая фигура - на верхней линии
     return false;
    }
   }
  }
 }
 return true;
}

function playGame() { 
 if (valid(0,1)) posY++;
 else {
  fixPosition();
  var cleared = clearLines();
  if (cleared) countPlus(cleared);
  if (gameOver) {
   //newGame();
   saveHiScore();
   return false;
  }
  newShape();
 }
}

function newGame() { //Новая игра

  requestHiScore();
  clearInterval (gameStepDuration);
  init ();
  nextFigureCreated = 0; newShape ();
  gameOver = false; linesCleared = 0; currentScore = 0; countPlus (0); 
  gameStepDuration = setInterval (playGame,300); //скорость игры, мс
}

function startGame(id){
  userId = id;
  newGame();
  setInterval (render,50); //частота перерисовки, мс
}


function requestHiScore(){
  $.get("/game/gethiscore", {}, loadHiScore);
}

function loadHiScore(hiScore){
  highestScore = hiScore;
  document.getElementById('scores').innerHTML = 
  "linesCleared: "+linesCleared+"<br>currentScore: "+currentScore+"<br>Record: "+highestScore;
}

function saveHiScore(){
  //$.post("/game/savehiscore", {id:userId, score:currentScore}, ()=>{});
  $.ajax ({
    url: "/game/savehiscore",
    type: "POST",
    data: JSON.stringify({id:userId, score:currentScore}),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(){
        //
    }
});
}

//newGame();


