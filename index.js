let direction = {x: 0 ,y: 0};
const foodsound = new Audio('music/food.mp3');
const gameover = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const music = new Audio('music/music.mp3');
let board = document.getElementById('board');
let speed = 5;
let lastpaintime = 0;
let snakearr = [ {x: 10,y: 11}];
let food1 = { x:5, y: 6};
let score = 0;
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastpaintime)/1000 < 1/speed){
        return;
    }
    lastpaintime = ctime;
    gameengine();
}
function iscollide(arr){
for(let i=1;i<snakearr.length;i++)
{
  if(arr[i].x === arr[0].x && arr[i].y ===arr[0].y)
  {
    return true;
  }
}
if(arr[0].x >= 18 || arr[0].x <=0 && arr[0].y >=18 || arr[0].y <=0)
{
  return true;
}
}
function gameengine()
{
  if(iscollide(snakearr)){
    gameover.play();
    inputdir ={ x:0,y:0}
    alert("game over");
    snakearr = [{x:10,y:11}]
    music.play();
    score = 0;
    }
    if(snakearr[0].y === food1.y && snakearr[0].x === food1.x){
      foodsound.play();
      score +=1;
      scorebox.innerHTML= "Score:" + score;
      snakearr.unshift({x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y});
      let a = 2;
      let b = 15;
      food1 ={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }
    for(let i = snakearr.length-2;i>=0;i--)
    {
      snakearr[i+1]= {...snakearr[i]};
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;
  board.innerHTML="";
  snakearr.forEach((e, index)=>{
    snakeelement = document.createElement('div');
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;
    if(index === 0){
      snakeelement.classList.add('head');
    }
    else {

      snakeelement.classList.add('snake');
    }
    

    board.appendChild(snakeelement);
  });
  foodelement = document.createElement('div');
  foodelement.style.gridRowStart=food1.y;
  foodelement.style.gridColumnStart= food1.x;
  foodelement.classList.add('food');
  board.appendChild(foodelement);
    
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
  inputdir = {x: 0, y:1}
  movesound.play();
  switch(e.key)
  {
    case "ArrowUp":
      inputdir.x=0;
      inputdir.y= -1;
      break;
    case "ArrowDown":
     inputdir.x=0;
     inputdir.y=1;
      break;
    case "ArrowLeft":
     inputdir.x= -1;
     inputdir.y= 0;
      break;
    case "ArrowRight":
       inputdir.x = 1;
       inputdir.y=0;
       break;

       default:
         break;
  }
});