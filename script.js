var canvas= document.getElementById("canvas");
var ctx= canvas.getContext("2d");
var scoreLabel = document.getElementById('score');

var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;

startgame();

function startgame()
{
  createcell();
  drawboard();
  newcell();
  newcell();
}

function cell(row,col)
{
  this.value=0;
  this.x=col*width+5*(col+1);
  this.y=row*width+5*(row+1);
}

function createcell()
{
  var i,j;
  for(i=0;i<size;i++)
  {
    cells[i]=[];
    for(j=0;j<size;j++)
    {
       cells[i][j]= new cell(i,j);
    }
  }
}

function drawcell(cell)
{
  ctx.beginPath();
  ctx.rect(cell.x,cell.y,width,width);

  switch(cell.value)
  {
    case 0: ctx.fillStyle="#FFFFFF";break;
    case 2: ctx.fillStyle="#F1FB06";break;
    case 4: ctx.fillStyle="#FBF306";break;
    case 8: ctx.fillStyle="#FBE406 ";break;
    case 16: ctx.fillStyle="#FBD906 ";break;
    case 32: ctx.fillStyle="#FBC706 ";break;
    case 64: ctx.fillStyle="#FBB006 ";break;
    case 128: ctx.fillStyle="#FBA206 ";break;
    case 256: ctx.fillStyle="#FB8806 ";break;
    case 512: ctx.fillStyle="#FB8006 ";break;
    case 1024: ctx.fillStyle="#FB6A06 ";break;
    case 2048: ctx.fillStyle="#FB4C06 ";break;
    case 4096: ctx.fillStyle="#FB0606 ";break;
    default: ctx.fillStyle="FF0000";break;
  }
  ctx.fill();
  if (cell.value)
  {
    fontSize = width/2;
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }

}

function drawboard()
{
  var i,j;
  for(i=0;i<size;i++)
  {
    for(j=0;j<size;j++)
    {
        drawcell(cells[i][j]);
    }
  }
}

document.onkeydown = function (event)
{
  if (!loss)
  {
    if (event.keyCode === 38)
    {up();}
    else if (event.keyCode === 39)
    {right();}
    else if (event.keyCode === 40)
    {down();}
    else if (event.keyCode === 37)
    {left();}
    scoreLabel.innerHTML = 'Score : ' + score;
  }
}

function right ()
{
  var i, j,col;
  for(i=0;i<size;i++)
  {
    for(j=size-2;j>=0;j--)
    {
      if(cells[i][j].value)
      {
        col=j;
        while(col+1<size)
        {
          if(!cells[i][col+1].value)
          {
            cells[i][col+1].value=cells[i][col].value;
            cells[i][col].value=0;
            col++;
          }
          else if (cells[i][col].value==cells[i][col+1].value)
          {
            cells[i][col+1].value *= 2;
            score += cells[i][col+1].value;
            cells[i][col].value = 0;
            break;
          }
          else
          {
            break;
          }
        }
      }
    }
  }
  newcell();
}

function left()
{
  var i, j,col;
  for(i = 0; i < size; i++) {
    for(j = 1; j < size; j++) {
      if(cells[i][j].value) {
        col = j;
        while (col - 1 >= 0) {
          if (!cells[i][col - 1].value) {
            cells[i][col - 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col--;
          } else if (cells[i][col].value == cells[i][col - 1].value) {
            cells[i][col - 1].value *= 2;
            score +=   cells[i][col - 1].value;
            cells[i][col].value = 0;
            break;
          } else
          {
            break;
          }
        }
      }
    }
  }
  newcell();
}

function up()
{
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = 1; i < size; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  newcell();
}

function down()
{
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = size - 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  newcell();
}

function newcell()
{
  var empty = 0;
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      if(!cells[i][j].value) {
        empty++;
      }
    }
  }
  if(!empty) {
    endgame();
    return;
  }
  while(true) {
    var row = Math.floor(Math.random() * size);
    var col = Math.floor(Math.random() * size);
    if(!cells[row][col].value) {
      cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
      drawboard();
      return;
    }
  }
}

function endgame()
{
  canvas.style.opacity = '0.5';
  loss = true;
}
