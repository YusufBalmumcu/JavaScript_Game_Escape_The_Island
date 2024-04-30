// SAVAŞA GİRME VE ÇIKMA ANİMASYONU
function fadeInScreenRightToLeft(element) {
    var opacity = 0;
    var intervalId = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.05;
            element.style.opacity = opacity;
            element.style.clipPath = `polygon(${100 - opacity * 100}% 0, 100% 0, 100% 100%, ${100 - opacity * 100}% 100%)`;
        } else {
            clearInterval(intervalId)
            fadeOutScreenRightToLeft(element)
        }
    }, 10);
}
function fadeOutScreenRightToLeft(element) {
    var opacity = 1;
    var intervalId = setInterval(function() {
        if (opacity > 0) {
            opacity -= 0.05;
            element.style.opacity = opacity;
            element.style.clipPath = `polygon(${100 - opacity * 100}% 0, 100% 0, 100% 100%, ${100 - opacity * 100}% 100%)`;
        } else {
            clearInterval(intervalId)
            fadeInScreenLeftToRight(element)
        }
    }, 10);
}
function fadeInScreenLeftToRight(element) {
    var opacity = 0;
    var intervalId = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.05;
            element.style.opacity = opacity;
            element.style.clipPath = `polygon(0 0, ${opacity * 100}% 0, ${opacity * 100}% 100%, 0 100%)`;
        } else {
            clearInterval(intervalId)
            fadeOutScreenLeftToRight(element)
        }
    }, 10);
}
function fadeOutScreenLeftToRight(element) {
    var opacity = 1;
    var intervalId = setInterval(function() {
        if (opacity > 0) {
            opacity -= 0.05;
            element.style.opacity = opacity;
            element.style.clipPath = `polygon(0 0, ${opacity * 100}% 0, ${opacity * 100}% 100%, 0 100%)`;
        } else {
            clearInterval(intervalId);
            fadeInScreenRightToLeft2
        }
    }, 10);
}
function fadeInScreenRightToLeft2(element) {
    var opacity = 0;
    var intervalId = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.05;
            element.style.opacity = opacity;
            element.style.clipPath = `polygon(${100 - opacity * 100}% 0, 100% 0, 100% 100%, ${100 - opacity * 100}% 100%)`;
        } else {
            clearInterval(intervalId)
            fadeOutScreenRightToLeft2(element)
        }
    }, 10);
}
function fadeOutScreenRightToLeft2(element) {
    var opacity = 1;
    var intervalId = setInterval(function() {
        if (opacity > 0) {
            opacity -= 0.05;
            element.style.opacity = opacity;
            element.style.clipPath = `polygon(${100 - opacity * 100}% 0, 100% 0, 100% 100%, ${100 - opacity * 100}% 100%)`;
        } else {
            clearInterval(intervalId)
            fadeInScreenLeftToRight(element)
        }
    }, 10);
}

function fadeInScreenRightToLeftLast(element) {
    var opacity = 0;
    var intervalId = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.05;
            element.style.opacity = opacity;
            element.style.clipPath = `polygon(${100 - opacity * 100}% 0, 100% 0, 100% 100%, ${100 - opacity * 100}% 100%)`;
        }
    }, 10);
}