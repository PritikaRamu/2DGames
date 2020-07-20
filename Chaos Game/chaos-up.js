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
  c.rect(0,0,600,600);
  c.fillStyle="black";
  c.fill();
  var n=document.getElementById("sides").value;
  var X=[]; var Y=[];
  var k,i;
  var x=300,y=300;
  for(k=1,i=0;k<=n;k++,i++)
  {
    X[i]=300+(250*Math.cos(2*k*Math.PI/n));Y[i]=300+(250*Math.sin(2*k*Math.PI/n));
  }

  for(var i=0;i<n;i++)
  {
    setTimeout(dot(X[i],Y[i]));
  }

  for(var i=0;i<50000;i++)
  {
    var a=Math.floor(Math.random()*n);
    x=(X[a]+x)/2;y=(Y[a]+y)/2;
    dot(x,y);
  }
}

chaosgame();
