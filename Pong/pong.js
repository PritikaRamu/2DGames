var paddleHeight = 150;
var br = 25;
var halfPaddleHeight = paddleHeight / 2;
var paddleWidth = 30;
var p1speed = 0;
var p1pos = 460;
var p2speed = 0;
var p2pos = 460;
var topball = 475;
var leftball = 800;
var topspeedball = 0;
var leftspeedball = 0;
var score1=0;
var score2=0;
var p=0;
var loss=0;


document.addEventListener('keydown', function (e)
{
 if (e.keyCode == 87 || e.which == 87)
 {
 p1speed = -10;
 }
 if (e.keyCode == 83 || e.which == 83)
 {
 p1speed = 10;
 }
 if (e.keyCode == 38 || e.which == 38)
 {
 p2speed = -10;
 }
 if (e.keyCode == 40 || e.which == 40)
 {
 p2speed = 10;
 }
}, false);

document.addEventListener('keyup', function (e) {
 if (e.keyCode == 87 || e.which == 87) {
 p1speed = 0;
 }
 if (e.keyCode == 83 || e.which == 83) {
 p1speed = 0;
 }
 if (e.keyCode == 38 || e.which == 38) {
 p2speed = 0;
 }
 if (e.keyCode == 40 || e.which == 40) {
 p2speed = 0;
 }
}, false);

var t;
t=window.setInterval(function show()
{
 p1pos += p1speed;
 p2pos += p2speed;

 if (p1pos <= 150)
 {
  p1pos = 150;
 }
 if (p2pos <= 150)
 {
  p2pos = 150;
 }
 if (p1pos >= window.innerHeight - paddleHeight)
 {
  p1pos = window.innerHeight - paddleHeight;
 }
 if (p2pos > window.innerHeight - paddleHeight)
 {
  p2pos = window.innerHeight - paddleHeight;
 }

document.getElementById('paddle1').style.top =(p1pos) + 'px';
document.getElementById('paddle2').style.top =(p2pos) + 'px';

topball += topspeedball;
leftball += leftspeedball;

if (topball <= 150 || topball >= window.innerHeight - br)
{
 topspeedball = -topspeedball;
}
if (leftball <= paddleWidth)
{
 if (topball > p1pos && topball < p1pos + paddleHeight)
 {
     leftspeedball = -leftspeedball;
 }
 else
 {
     score2++;
     startball();
 }
}
if (leftball >= window.innerWidth - br - paddleWidth)
{
 if (topball > p2pos && topball < p2pos + paddleHeight)
 {
     leftspeedball = -leftspeedball;
 }
 else
 {
     score1++;
     startball();
 }
}

document.getElementById('ball').style.top = (topball) + 'px';
document.getElementById('ball').style.left = (leftball) + 'px';

document.getElementById('score1').innerHTML =score1;
document.getElementById('score2').innerHTML =score2;
if(score1==5 || score2==5)
{
  loss=1;
}
}, 1000/60);





function startball()
{
  if(score1==5 || score2==5)
  {
    clearInterval(t);
  }
topball = 475;
leftball = 800;
if (Math.random() < 0.5)
{
  var side = 1;
}
else
{
  var side = -1;
}
 topspeedball = Math.random() * -2-7;
 leftspeedball = side * (Math.random() * 2+7 );
};

window.setInterval(function glitch()
{
  if(p%2==0)
  {
    document.getElementById('paddle1').style.backgroundColor='black';
    document.getElementById('paddle2').style.backgroundColor='white';
    document.getElementById('paddle2').style.boxShadow= '0px 0px 20px 0px #ffffff';
    document.getElementById('paddle1').style.boxShadow= '0px 0px 20px 0px #000000';

  }
  else
  {
    document.getElementById('paddle2').style.backgroundColor='black';
    document.getElementById('paddle1').style.backgroundColor='white';
    document.getElementById('paddle1').style.boxShadow= '0px 0px 20px 0px #ffffff';
    document.getElementById('paddle2').style.boxShadow= '0px 0px 20px 0px #000000';

  }
  p=p+1;
},3000);
