var canvas=document.getElementById("canvas");
var c=canvas.getContext("2d");

function dot(x,y)
{
  c.beginPath();
  c.arc(x,y,1,0,2*Math.PI);
  c.fillStyle="white";
  c.fill();
}

function chaosgame()
{
  var x1=300; var y1=50; var x2=100; var y2=550; var x3=500; var y3=550;
  dot(x1,y1);dot(x2,y2);dot(x3,y3);
  var x = Math.random() * 500;
  var y = Math.random() * 500;
  for(var i=0;i<300000;i++)
  {
    var a=Math.floor(Math.random()*3);
    switch(a)
    {
      case 0:x=(x+x1)/2;y=(y+y1)/2;dot(x,y);break;
      case 1:x=(x+x2)/2;y=(y+y2)/2;dot(x,y);break;
      case 2:x=(x+x3)/2;y=(y+y3)/2;dot(x,y);break;
    }
  }
}

chaosgame();
