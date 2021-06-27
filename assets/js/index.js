var btn = document.getElementById('img')
var angle = 0

anglePerFrame = 18
var snd = new Audio('./assets/audios/audio.mp3');

var spinningSound = new Audio('./assets/audios/euphoria.mp3')
function rotate(dir) {
    if (anglePerFrame > 0) {
        btn.style.transform = `rotate(${angle}deg)`
        angle %= 360;
        dir ? angle += anglePerFrame : angle -= anglePerFrame;
        anglePerFrame -= 0.1;
        setTimeout(() => { rotate(dir) }, 20)
    }
    else {
        spinningSound.pause()
        spinningSound.currentTime = 0
        setTimeout(() => { render(messages[getResult()]) }, 500)
    }
}
function render(message) {
    getel('popupHolder').style.display = 'block'
    getel('popupTxt').innerHTML = message
    fadeOutPOpupText(1, 400)
    snd.play();
    document.getElementById("message").innerHTML = message
    $('#myModal').modal({ show: true })

}
function initializeRotate(x) {
    anglePerFrame = x
    angle = 0
    rotate(Math.floor(Math.random() * 2))
}
slowRotaion(Math.floor(Math.random() * 2))
var shouldSlowRotate = 1

function slowRotaion(dir) {
    btn.style.transform = `rotate(${angle}deg)`


    dir ? angle++ : angle--
    angle += 360
    angle %= 360;
    setTimeout(() => { if (shouldSlowRotate) slowRotaion() }, 20)
}
function getResult() {
    var pointerAngle = (360 + (angle - 90)) % 360
    var cur = messages.length - 1
    while (pointerAngle >= 18) {
        pointerAngle -= 18
        cur--
    }
    return cur
}


var messages = ["", "Watch star and moon", "Oops nothing! :(", "Be forever", "Pillow fights", "Watch sunset", "Workout together", "Long drives", "A night walk", "Cuddles", "Marry", "Cook food", "Dinner date", "Spend a day", "Chocolates", "Photo together", "Netflix and chill", "Go for a vacation", "Icecream date", "Pizza ", "Warm tight hugs"]



$('#myModal').on('hidden.bs.modal', function (e) {
    shouldSlowRotate = 1
    slowRotaion(Math.floor(Math.random() * 2))
    snd.pause()
    snd.currentTime = 0
    getel('initialScreen').style.display = 'block'
})

function getel(x) {
    return document.getElementById(x)
}
function fadeOutPOpupText(currentAlpha, currentFont) {
    if (currentAlpha > 0) {
        getel('popupHolder').style.background = `rgb(0,0,0,${currentAlpha})`
        getel('popupTxt').style.fontSize = `${currentFont}%`
        currentAlpha -= 0.03
        currentFont += 50
        setTimeout(() => {
            fadeOutPOpupText(currentAlpha, currentFont)
        }, 20);
    }
    else getel('popupHolder').style.display = 'none'
}

getel('initialScreen').onclick = () => {
    getel('initialScreen').style.display = 'none'
    shouldSlowRotate = 0
    spinningSound.play()
    initializeRotate(Math.floor(Math.random() * 20) + 20)
}

