const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')



// OYUN PENCERESİNİN BOYUTU
canvas.width = 1024
canvas.height = 576

// HARİTANIN DOĞRU YERDE GÖSTERİLMESİ İÇİN GEREKLİ KONUM BİLGİLERİ
const offset = {
    x: -2150,
    y: -2150
}

// HARİTA VERİLERİ YÜKLENİR VE DİZİYE ATILIR
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 100) {
    collisionsMap.push(collisions.slice(i, i + 100))
}

const battlezonesMap = []
for (let i = 0; i < battlezonesdata.length; i += 100) {
    battlezonesMap.push(battlezonesdata.slice(i, i + 100))
}

const winzonesMap = []
for (let i = 0; i < winzonesdata.length; i += 100) {
    winzonesMap.push(winzonesdata.slice(i, i + 100))
}

const winzones = []

winzonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 9)
        winzones.push(
    new Boundary({
        position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y 
        }
    })
)
})
})


const boundaries = []

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 5)
        boundaries.push(
    new Boundary({
        position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y 
        }
    })
)
})
})

const battlezones = []

battlezonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1)
        battlezones.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y 
            }
          })
        )
    })
})

// KULLANILACAK İMAJLAR YÜKLENİR
const bgImage = new Image()
bgImage.src = 'img/island.png'

const fgImage = new Image()
fgImage.src = 'img/foreground.png';

const playerDownImage = new Image()
playerDownImage.src = 'img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = 'img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = 'img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = 'img/playerRight.png'

//KULLANILACAK SPRİTE LAR OLUŞTURULUR 
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {max: 4},
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: fgImage
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: bgImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

const movables= [
    background, 
    ...boundaries,
    ...battlezones,
    ...winzones,
     foreground]


// COLLISION TESPİTİ
function rectangularCollision ({rect1, rect2}) {
    return(
        rect1.position.x + rect1.width >= rect2.position.x && 
        rect1.position.x <= rect2.position.x + rect2.width && 
        rect1.position.y + rect1.height >= rect2.position.y && 
        rect1.position.y <= rect2.position.y + rect2.height)
}

const battle = {
    init: false
}

//HARİTA VE KARAKTER ANİMASYONU
function animation_loop() {


    const overworldAnimation = window.requestAnimationFrame(animation_loop)

        background.draw()
        
        boundaries.forEach((boundary)=> {boundary.draw()})

        battlezones.forEach((battlezones)=> {battlezones.draw()})

        winzones.forEach((winzone)=> {winzone.draw()})
        
        player.draw()

        foreground.draw()

    let moving = true
    player.animate = false   
    // SAVAŞ BAŞLADIYSA HAREKETLERİ DURDUR
    if (battle.init) {
        return
    }
    else {
    //SAVAŞ YOKSA HAREKETİ DEVAM ETTİR
        let moving = true
        player.animate = false   
    }

    // OYUNU KAZANMA KONTROLÜ
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < winzones.length; i++){
            const winzone = winzones[i]
            if (rectangularCollision({
                rect1:player,
                rect2:winzone
                })
            ){
                console.log("Oyunu Kazandınız")
                fadeInScreenRightToLeftLast(document.getElementById("winID"));
                moving = false
                return window.cancelAnimationFrame(overworldAnimation)
            }
        }
    }



    // SAVAŞ BAŞLATMA
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battlezones.length; i++){
            const battlezone = battlezones[i]
            const overlapping = (Math.min(player.position.x + player.width,battlezone.position.x + battlezone.width) -
                Math.max(player.position.x, battlezone.position.x)) *
                (Math.min(player.position.y + player.height,battlezone.position.y + battlezone.height) -
                Math.max(player.position.y, battlezone.position.y))
            if (rectangularCollision({
                rect1:player,
                rect2:battlezone
                }) &&
                overlapping > (player.width * player.height) / 2  && Math.random() < 0.01
            ){
                // SAVAŞA GİRMEK İÇİN DÜNYA ANİMASYONUNU DURDUR
                console.log("savas basladi")
                battle.init = true
                fadeInScreenRightToLeft(document.getElementById("overlappingID"));
                initBattle()
                animateBattle()
                break
            }
        }
    }



    // KARAKTER HAREKETİ VE COLLİSİON TESPİTİ
    if(keys.w.pressed && lastkey == "w"){
        player.animate = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rect1:player,
                rect2:{
                    ...boundary,
                    position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 1
                    }
                }
                })
            ){
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) =>
            movable.position.y += 1)
    }
    else if(keys.a.pressed && lastkey == "a") {
        player.animate = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rect1:player,
                rect2:{
                    ...boundary,
                    position: {
                    x: boundary.position.x + 1,
                    y: boundary.position.y
                    }
                }
                })
            ){
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) =>
            movable.position.x += 1)
    }
    else if(keys.s.pressed && lastkey == "s") {
        player.animate = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rect1:player,
                rect2:{
                    ...boundary,
                    position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 1
                    }
                }
                })
            ){
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) =>
            movable.position.y -= 1)
    }
    else if(keys.d.pressed && lastkey == "d")  {
        player.animate = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (rectangularCollision({
                rect1:player,
                rect2:{
                    ...boundary,
                    position: {
                    x: boundary.position.x - 1,
                    y: boundary.position.y 
                    }
                }
                })
            ){
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) =>
            movable.position.x -= 1)
    }
    
}
//OYUN BAŞLADIĞINDA SAVAŞ KONTROLLERİNİ KAPAT VE ANİMASYONU BAŞLAT
document.querySelector("#UI").style.display = "none"
animation_loop()

//SAVAŞ İMAJLARINI YÜKLEYİP BAŞLAT
const battleBackgroundImg = new Image()
battleBackgroundImg.src = 'img/battlebackground.png'

const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImg
})


const slimeImg = new Image()
slimeImg.src = 'img/slime.png'


const playerbattleImg = new Image()
playerbattleImg.src = 'img/player.png'

let slime
let playerbattle

let battleAnimationId
const attacks = {Atak: {damage: 10}, Kaç: {damage: 100}}

//SAVAŞI BAŞLAT
function initBattle(){
    document.querySelector("#UI").style.display = "block"
    document.querySelector("#enemyhealthbar").style.width = "240px"
    document.querySelector("#playerhealthbar").style.width = "240px"
    slime = new Sprite({
        position: {
            x: 680,
            y: 215
        },
        image:slimeImg
        ,isEnemy: true
    })
    playerbattle = new Sprite({
        position: {
            x: 300,
            y: 375
        },
        image:playerbattleImg
    }) 

    // ATAK VE KAÇMA BUTONU
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const attackType = button.innerHTML;
    
            if (attacks.hasOwnProperty(attackType)) {
                const damage = attacks[attackType].damage;
                playerbattle.attack({
                    attack: {
                        damage: damage,
                    },
                    target: slime
                });
                slime.attack({
                    attack: {
                        damage: 8,
                    },
                    target: playerbattle
                });
    
                //DÜŞMANIN CANI SIFIRDAN DAHA AZSA OYUNCU KAZANDI 
                if (slime.health <= 0) {
                    console.log("Oyuncu Kazandi")
                    fadeOutScreenRightToLeft(document.getElementById("overlappingID"));
                    document.querySelector("#UI").style.display = "none"
                    window.cancelAnimationFrame(battleAnimationId)
                    battle.init=false
                }
            } else {
                console.error(`Attack type "${attackType}" is not defined.`);
            }
        });
    });
}

//SAVAŞ SPRİTELARINI ÇİZ
function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)

    battleBackground.draw()
    slime.draw()
    playerbattle.draw()
}




