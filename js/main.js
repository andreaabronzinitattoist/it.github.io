var options = ["40€","50€","60€","40€","50€","60€","40€","50€"];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;
var count = 0;
var form_email = document.querySelector(".container-form")
var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var text = "";
var ctx;
var mobile = window.matchMedia("(max-width: 700px)");
var numero = "";


document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    var phase = 126;
    var center = 126;
    var width = 126;
    var frequency = Math.PI * 2 / maxitem;

    var red, green, blue;
    var colorOrder = ['#ef2e7a', '#f9c3e4', '#d7e727', '#49c1b4'];

    // Calcola i valori RGB
    red = Math.sin(frequency * item + 2 + phase) * width + center;
    green = Math.sin(frequency * item + 100 + phase) * width + center;
    blue = Math.sin(frequency * item + 4 + phase) * width + center;

    // Determina l'indice del colore da restituire in base all'ordine
    var colorIndex = item % colorOrder.length;

    // Restituisci il colore in base all'ordine
    return colorOrder[colorIndex];
}





function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");

    if (mobile.matches)
    {
        if (canvas.getContext) {
            var outsideRadius = 300;
            var textRadius = 80;
            var insideRadius = 20;
            canvas.height="300";
            canvas.width="300";
            ctx = canvas.getContext("2d");
            ctx.lineWidth = 2;


            ctx.font = 'bold 25px Helvetica, Arial';

            for(var i = 0; i < options.length; i++) {
                var angle = startAngle + i * arc;
                //ctx.fillStyle = colors[i];
                ctx.fillStyle = getColor(i, options.length);

                ctx.beginPath();
                ctx.arc(150, 150, outsideRadius, angle, angle + arc, false);
                ctx.arc(150, 150, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.boxShadow="0px 27px 12px 15px rgba(0,0,0,0.82);";
                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur    = 0;
                ctx.shadowColor   = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                ctx.translate(150 + Math.cos(angle + arc / 2) * textRadius,
                    150 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                var text = options[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }

            //Arrow
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(400 - 8, 380 - (outsideRadius + 5));
            ctx.lineTo(400 + 8, 380 - (outsideRadius + 5));
            ctx.lineTo(400 + 8, 410 - (outsideRadius - 5));
            ctx.lineTo(400 + 18, 410 - (outsideRadius - 5));
            ctx.lineTo(400 + 0, 430 - (outsideRadius - 13));
            ctx.lineTo(400 - 18, 410 - (outsideRadius - 5));
            ctx.lineTo(400 - 8, 410 - (outsideRadius - 5));
            ctx.lineTo(400 - 8, 410 - (outsideRadius + 5));
            ctx.fill();
        }
    } else
    {

        if (canvas.getContext) {
            var outsideRadius = 300;
            var textRadius = 160;
            var insideRadius = 50;

            ctx = canvas.getContext("2d");
            ctx.lineWidth = 2;


            ctx.font = 'bold 40px Helvetica, Arial';

            for(var i = 0; i < options.length; i++) {
                var angle = startAngle + i * arc;
                //ctx.fillStyle = colors[i];
                ctx.fillStyle = getColor(i, options.length);

                ctx.beginPath();
                ctx.arc(350, 350, outsideRadius, angle, angle + arc, false);
                ctx.arc(350, 350, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur    = 0;
                ctx.shadowColor   = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                ctx.translate(350 + Math.cos(angle + arc / 2) * textRadius,
                    350 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                var text = options[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }

            //Arrow
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(350, 3 + (outsideRadius + 5));
            ctx.lineTo(350 + 8, 3 + (outsideRadius + 5));
            ctx.lineTo(350 + 8, -10 + (outsideRadius - 5));
            ctx.lineTo(350 + 18, -10 + (outsideRadius - 5));
            ctx.lineTo(350 + 0, -15 + (outsideRadius - 13));
            ctx.lineTo(350 - 18, -10 + (outsideRadius - 5));
            ctx.lineTo(350 - 8, -10 + (outsideRadius - 5));
            ctx.lineTo(350 - 8, -5 + (outsideRadius + 5));
            ctx.fill();

        }
    }


}

function spin() {
    count += 1;
    if (count <= 1)
    {
    spinAngleStart = Math.random() * 20 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 3000;
    rotateWheel();
    }
}

function rotateWheel() {
    spinTime += 30;

    if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {

    var win = document.querySelector(".text-win");

    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);

    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    text = options[index]


        if ((localStorage.text == "40€") || (localStorage.text == "50€") || (localStorage.text == "60€")  )
        {

            form_email.classList.remove("active")
            ctx.restore();
            numero = localStorage.text;
            win.textContent="Sembra che tu abbia già girato la ruota una volta, hai vinto " + numero;
            if (mobile.matches)
            {
                win.classList.add("")
            }
        }
    else
        {

            localStorage.text = text;
            ctx.restore();
            form_email.classList.remove("active")
            numero = localStorage.text;
            win.textContent="Congratulazione hai vinto " + numero;
        }

}

function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();
const form = document.querySelector('.contact-from');
function sendMsg(e)
{
    e.preventDefault()
    nomepersona = document.querySelector('.name');
    email = document.querySelector('.email');
    ms = document.querySelector('.ms');

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "andrea.bronzini.tattoo@gmail.com",
        Password : "9500C6D053EAA8489B0DFC135D50C4645370",
        To : 'andrea.bronzini.tattoo@gmail.com',
        From : 'andrea.bronzini.tattoo@gmail.com',
        Subject : "contact from",
        Body : "nome: " + nomepersona.value + "\r email: " + email.value + " \r " + ms.value + numero
    }).then(
        message => alert("Email inviata con successo, verrai ricontattato il prima possibile")
    );
}
form.addEventListener('submit', sendMsg);

