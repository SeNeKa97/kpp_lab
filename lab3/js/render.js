var canvas = document.getElementById ('main-canvas');
var ctx = canvas.getContext ('2d');
var width = canvas.width, height = canvas.height;
var blockWidth = width / columns, blockHeight = height / rows;

function drawBlock (x,y) { //Нарисовать фигуру в позиции (x,y)
 ctx.fillRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
 ctx.strokeRect (blockWidth*x, blockHeight*y, blockWidth-1, blockHeight-1);
}

function render() { //Нарисовать стакан и фигуры
 ctx.clearRect( 0, 0, width, height );
 ctx.strokeStyle = 'black';
 for (var x=0; x<columns; x++) {
  for (var y = 0; y < rows; y++ ) {
   if (board[y][x]) {
    ctx.fillStyle = colors[board[y][x]-1];
    drawBlock (x,y);
   }
  }
 }
 ctx.fillStyle = 'red';
 ctx.strokeStyle = 'black';
 for (var y=0; y<4; y++) {
  for (var x=0; x<4; x++) {
   if (currentFigure[y][x]) {
    ctx.fillStyle = colors[currentFigure[y][x]-1];
    drawBlock (posX+x,posY+y);
   }
  }
 }
}

