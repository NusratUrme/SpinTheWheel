var btn = document.getElementById('img')
var angle = 0

anglePerFrame = 18
var messageAudio = new Audio('./assets/audios/audio.mp3');

var spinAudio = new Audio('./assets/audios/spin.mp3');

var rotationAudio = new Audio('./assets/audios/rotationAudio.mp3');

$('#myModal').modal("hide")


function rotate(dir) {
    if (anglePerFrame > 0) {
        btn.style.transform = `rotate(${angle}deg)`
        angle %= 360;
        dir ? angle += anglePerFrame : angle -= anglePerFrame;
        anglePerFrame -= 0.08;
        setTimeout(() => { rotate(dir) }, 20)
    }
    else {
        spinAudio.pause()
        spinAudio.currentTime = 0
        setTimeout(() => { render(messages[getResult()]) }, 800)
    }
}
function render(message) {


    spinAudio.pause()
    spinAudio.currentTime = 0
    messageAudio.play();
    document.getElementById("message").innerHTML = message
    $('#myModal').modal({ show: true })
    setTimeout(() => {
        getel('popupHolder').style.display = 'block';
        getel('popupTxt').innerHTML = message;
        fadeOutPOpupText()
    }, 1000)
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
    angle < 0 ? angle += 360 : angle += 0
    var pointerAngle = (360 + (angle - 90)) % 360
    var cur = messages.length - 1
    while (pointerAngle >= 18) {
        pointerAngle -= 18
        cur--
    }
    return cur
}


var messages = ["",
    "Watch stars and moon",
    "Oops nothing! :(",
    "Be forever",
    "Pillow fights",
    "Watch sunset",
    "Workout together",
    "Long drives",
    "A night walk",
    "Cuddles",
    "Marry",
    "Cook food",
    "Dinner date",
    "Spend a day",
    "Chocolates",
    "Photo together",
    "Netflix and chill",
    "Go for a vacation",
    "Icecream date",
    "Pizza ",
    "Warm tight hugs"
]



$('#myModal').on('hidden.bs.modal', function (e) {
    shouldSlowRotate = 1
    slowRotaion(Math.floor(Math.random() * 2))
    messageAudio.pause()
    messageAudio.currentTime = 0
    rotationAudio.play()
    getel('initialScreen').style.display = 'block'
})

function getel(x) {
    return document.getElementById(x)
}
function fadeOutPOpupText() {
    getel('popupTxt').style.animation = 'anim 2s ease-out'
    setTimeout(() => { getel('popupHolder').style.display = 'none' }, 2000)

}

getel('initialScreen').onclick = () => {
    getel('initialScreen').style.display = 'none'
    shouldSlowRotate = 0
    rotationAudio.currentTime = 0
    rotationAudio.pause()
    spinAudio.play()

    initializeRotate(Math.floor(Math.random() * 25) + 25)
}

