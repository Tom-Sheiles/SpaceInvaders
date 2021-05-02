var canvas = document.querySelector('canvas');
var scoreText = document.querySelector('p');
var ctx = canvas.getContext('2d');
document.addEventListener("keydown", keydown)

var tileSize = 25;
let paused = true;

var dimensions = getDimensions(tileSize);

function shoot(){ bullets.push(new Bullet(Math.floor(player.x), player.y-1, "red")) }

function keydown(keyPressed)
{
    if(keyPressed.key == "Escape") paused = paused ? false : true;
    if(paused) return;

    if(keyPressed.key == "ArrowRight") player.x++;
    if(keyPressed.key == "ArrowLeft") player.x--;
    if(keyPressed.key == " ") shoot();
}

let score = 0;
let player = new Player(parseInt(dimensions.w/2), dimensions.h, "orange");
let aliens = [];
let bullets = [];

let numberOfAliens = 0;
let alienStartX = 3;
let alienX = alienStartX;
let alienY = 0;
let numberOfRows = 3;

for(let y = 0; y < numberOfRows; y++){
    for(let i = 0; i < dimensions.w - alienStartX*2; i++)
    {
        aliens.push(new Alien(alienX, alienY, "blue"));
        numberOfAliens++;
        alienX++;
    }
    alienY++;
    alienX = alienStartX;
}


let ticks = 0;
function Update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(!paused){
        if(ticks % 60 == 0) Alien.Think();
        if(ticks % 20 == 0) Bullet.Think();
    }

    player.Draw();
    aliens.forEach(alien => {
        alien.Draw();
    });
    bullets.forEach(bullet =>{
        bullet.Draw();
    })


    ticks++;
    window.requestAnimationFrame(Update);
}
window.requestAnimationFrame(Update);