//OYUNDAKİ SPRİTELARIN SINIFI
class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = {max: 1},
        sprites,
        animate = false,
        isEnemy = false
    }) {
        this.position = position
        this.image = image
        this.frames = {...frames, value: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.health = 100
        this.isEnemy = isEnemy
    }
    draw() {
        c.drawImage(
            this.image,
            this.frames.value * this.image.width/this.frames.max,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        )
        
        if (!this.animate) return 

            if (this.frames.max > 1) {
            this.frames.elapsed++

            }
            if (this.frames.elapsed % 20 == 0) {
                if (this.frames.value < this.frames.max - 1) this.frames.value++
                else this.frames.value = 0
            }
        }

        attack({ attack, target }) {
            var enemyHealthBar = document.getElementById('enemyhealthbar');
            var playerHealthBar = document.getElementById('playerhealthbar');
        if(this.isEnemy) {
            //console.log(`${this.name} attacks ${target.name} for ${attack.damage} damage!`);
            //console.log(target.health)
            target.health -= attack.damage;
            var newWidth = (target.health / 100) * 240; 
            playerHealthBar.style.width = `${newWidth}px`;
        }else{
            //console.log(`${this.name} attacks ${target.name} for ${attack.damage} damage!`);
            //console.log(target.health)
            target.health -= attack.damage;
            var newWidth = (target.health / 100) * 240; 
            enemyHealthBar.style.width = `${newWidth}px`;
        }
        
    }
}

// OYUNDAKİ BOUNDARY SAVAŞ VE KAZANMA BLOKLARININ SINIFI
class Boundary {
    static width = 64
    static height = 64
    constructor({position}) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
