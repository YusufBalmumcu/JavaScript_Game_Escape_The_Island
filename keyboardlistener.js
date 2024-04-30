window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey ="w"
            break
        case 'a':
            keys.a.pressed = true
            lastkey ="a"
            break
        case 's':
            keys.s.pressed = true
            lastkey ="s"
            break
        case 'd':
            keys.d.pressed = true
            lastkey ="d"
            break
        case 'W':
            keys.w.pressed = true
            lastkey ="w"
            break
        case 'A':
            keys.a.pressed = true
            lastkey ="a"
            break
        case 'S':
            keys.s.pressed = true
            lastkey ="s"
            break
        case 'D':
            keys.d.pressed = true
            lastkey ="d"
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'W':
            keys.w.pressed = false
            break
        case 'A':
            keys.a.pressed = false
            break
        case 'S':
            keys.s.pressed = false
            break
        case 'D':
            keys.d.pressed = false
            break
    }
})
