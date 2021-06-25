var btn = document.getElementById('img')
var angle = 0
anglePerFrame = 28
function rotate() {

    if (anglePerFrame > 0) {
        btn.style.transform = `rotate(${angle}deg)`
        angle %= 360; angle += anglePerFrame; anglePerFrame -= 0.1;
        setTimeout(() => { rotate() }, 20)
    }
    else {
        render(message[getResult()])
    }
}
function render(message) {

    document.getElementById("message").innerHTML = message
    $('#myModal').modal({ show: true })
}
function initializeRotate(x) {
    anglePerFrame = x
    angle = 0
    rotate()
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
document.getElementById('img').onclick = () => {
    initializeRotate(Math.floor(Math.random() * 20) + 20)
}

var message = ["", "Watch star and moon", "Oops nothing! :(", "Be forever", "Pillow fights", "Watch sunset", "Workout together", "Long drives", "A night walk", "Cuddles", "Marry", "Cook food", "Dinner date"]
