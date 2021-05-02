function fillRectGrid(x, y)
{
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
}

function fillCircleGrid(x, y)
{
    ctx.beginPath();
    ctx.arc((x+tileSize/2)+(tileSize*x), (y+tileSize/2)+(tileSize*y), tileSize/2, 0, 2 * Math.PI);
    ctx.fill();
}

function getDimensions(tileSize)
{
    return {w: canvas.width/tileSize-1, h: canvas.height/tileSize-1};
}


class Entity{
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    Draw()
    {
        ctx.fillStyle = this.color
        fillRectGrid(this.x, this.y);
    }
}


class Player extends Entity{}

class Bullet extends Entity{

    static Think()
    {
        bullets.forEach(bullet => {
            bullet.y--;
            for(let i = 0; i < aliens.length; i++)
            {
                if(bullet.x == aliens[i].x && bullet.y == aliens[i].y)
                {
                    aliens.splice(aliens.indexOf(aliens[i]), 1);
                    bullets.splice(bullets.indexOf(bullet), 1);
                    scoreText.innerHTML = `Score: ${++score}`
                }
            }
        });
    }
}

class Alien extends Entity{
    static direction = 1;
    static movingDown = false;
    Draw()
    {
        ctx.fillStyle = this.color;
        fillCircleGrid(this.x, this.y);
    }

    static Think()
    {
        for(let i = 0; i < aliens.length; i++)
            {
                if((aliens[i].x + 1 == dimensions.w && Alien.direction == 1) || (aliens[i].x - 1 == -1 && Alien.direction == -1))
                {
                    Alien.direction = -(Alien.direction);
                    Alien.movingDown = true;
                    break;
                }
            }

            aliens.forEach(alien => {
                if(!Alien.movingDown) alien.x += Alien.direction;
                else alien.y++;
            });

            Alien.movingDown = false;
    }
}