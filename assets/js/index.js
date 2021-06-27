var btn = document.getElementById('img')
var angle = 0

anglePerFrame = 28
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
        render(message[getResult()])
        $('.text').click(function () {
            $('.text').show();
        });
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
    var cur = 12
    while (pointerAngle >= 30) {
        pointerAngle -= 30
        cur--
    }
    return cur
}


var message = ["", "Watch star and moon", "Oops nothing! :(", "Be forever", "Pillow fights", "Watch sunset", "Workout together", "Long drives", "A night walk", "Cuddles", "Marry", "Cook food", "Dinner date"]

console.log("urme")

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
        currentAlpha -= 0.02
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

