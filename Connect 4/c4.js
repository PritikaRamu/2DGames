var canvas= document.getElementById("canvas");
var c= canvas.getContext("2d");
var player=document.getElementById("player");
var B =canvas.getBoundingClientRect();
var offsetX=B.left;
var offsetY=B.top;

var cells=[];
var rad=canvas.height/12 - 5;
var loss= false;
var p=1;

startgame();

function startgame()
{
  player.innerHTML='Player '+1;
  createcell();
  drawboard();
}

function cell(row,col)
{
  this.value=0;
  this.x=canvas.width/14+(col*canvas.width/7);
  this.y=canvas.height/12+(row*canvas.height/6);
}

function createcell()
{
  var i,j;
  for(i=0;i<6;i++)
  {
    cells[i]=[];
    for(j=0;j<7;j++)
    {
      cells[i][j]=new cell(i,j);
    }
  }
}

function drawcell(cell)
{
  c.beginPath();
  c.arc(cell.x,cell.y,rad,0,Math.PI*2);
  switch(cell.value)
  {
    case 0: c.fillStyle="white";break;
    case 1: c.fillStyle="red";break;
    case 2: c.fillStyle="blue";break;
  }
  c.fill();
  c.beginPath();
  c.arc(cell.x,cell.y,rad-10,0,Math.PI*2);
  switch(cell.value)
  {
    case 0: c.fillStyle="white";break;
    case 1: c.fillStyle="#B40909";break;
    case 2: c.fillStyle="#040859";break;
  }
  c.fill();

}

function drawboard()
{
  var i,j;
  for(i=0;i<6;i++)
  {
    for(j=0;j<7;j++)
    {
      drawcell(cells[i][j]);
    }
  }
}

function insert(col)
{
  var i;
  for(i=5;i>=0;i--)
  {
    if(cells[i][col].value==0)
    {
          if(p%2==0)
          {
            cells[i][col].value=2;
            player.innerHTML='Player '+1;
          }
          else
          {
            cells[i][col].value=1;
            player.innerHTML='Player '+2;
          }
          drawcell(cells[i][col]);
          p++;
          break;
    }
  }
  if(i==-1)
  {
    window.alert("Column full");
  }
  checkwin();
  if(loss==true)
  {
    if(p%2==0)
    {
      player.innerHTML='Player 1 wins!';
    }
    else
    {
      player.innerHTML='Player 2 wins!';
    }
  }
}

function checkwin()
{
  for(var i=5;i>=0;i--)
  {
    for(var j=0;j<4;j++)
    {
      if(cells[i][j].value!=0&&cells[i][j].value==cells[i][j+1].value&&cells[i][j+2].value==cells[i][j+3].value&&cells[i][j].value==cells[i][j+2].value)
      {loss=true;break;}
    }
  }             //horizontal
  if(loss==false)
  {
    for(var j=0;j<7;j++)
    {
      for(var i=5;i>=3;i--)
      {
        if(cells[i][j].value!=0&&cells[i][j].value==cells[i-1][j].value&&cells[i-2][j].value==cells[i-3][j].value&&cells[i][j].value==cells[i-2][j].value)
        {loss=true;break;}
      }
    }}             //vertical
  if(loss==false)
  {
    for(var i=0;i<=2;i++)
    {
      for(var j=0;j<=3;j++)
      {
        if(cells[i][j].value!=0&&cells[i+1][j+1].value==cells[i][j].value&&cells[i+2][j+2].value==cells[i+3][j+3].value&&cells[i][j].value==cells[i+2][j+2].value)
        {loss=true;break;}
      }
    }
  }           //backward
  if(loss==false)
  {
    for(var i=0;i<=2;i++)
    {
      for(var j=6;j>=3;j--)
      {
        if(cells[i][j].value!=0&&cells[i+1][j-1].value==cells[i][j].value&&cells[i+2][j-2].value==cells[i+3][j-3].value&&cells[i][j].value==cells[i+2][j-2].value)
        {loss=true;break;}
      }
    }
  }           //forward


}

document.onkeydown = function (event)
{
  if (!loss)
  {
    var input=event.keyCode;
    if(input===49||input===50||input===51||input===52||input===53||input===54||input===55)
    {
      var col_no=input-48;
      insert(col_no-1);
    }
    else
    {
      window.alert("Enter column number between 1 and 7");
    }
  }
}

canvas.onmousedown= function(event)
{
  if(!loss)
  {
    var mx=event.clientX-offsetX;
    var my=event.clientY-offsetY;
    if(mx<=canvas.width/7 && my<=canvas.height)
    {insert(0);}
    else if(mx>(canvas.width/7) && mx<=2*(canvas.width/7) && my<=canvas.height)
    {insert(1);}
    else if(mx>2*(canvas.width/7) && mx<=3*(canvas.width/7) && my<=canvas.height)
    {insert(2);}
    else if(mx>3*(canvas.width/7) && mx<=4*(canvas.width/7) && my<=canvas.height)
    {insert(3);}
    else if(mx>4*(canvas.width/7) && mx<=5*(canvas.width/7) && my<=canvas.height)
    {insert(4);}
    else if(mx>5*(canvas.width/7) && mx<=6*(canvas.width/7) && my<=canvas.height)
    {insert(5);}
    else if(mx>6*(canvas.width/7) && mx<=canvas.width && my<=canvas.height)
    {insert(6);}
  }
}
