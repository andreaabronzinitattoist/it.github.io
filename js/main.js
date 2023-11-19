const options = ["40€", "50€", "60€", "40€", "50€", "60€", "40€", "50€"];
let startAngle = 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;
let count = 0;
let form_email = document.querySelector(".container-form");
let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
let text = "";
let ctx;
let mobile = window.matchMedia("(max-width: 700px)");
let numero = "";


document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    const phase = 126;
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
            var outsideRadius = 170;
            var textRadius = 120;
            var insideRadius = 20;
            canvas.height="400";
            canvas.width="400";
            ctx = canvas.getContext("2d");
            ctx.lineWidth = 0;


            ctx.font = 'bold 25px Helvetica, Arial';

            for(var i = 0; i < options.length; i++) {
                var angle = startAngle + i * arc;
                //ctx.fillStyle = colors[i];
                ctx.fillStyle = getColor(i, options.length);

                ctx.beginPath();
                ctx.arc(200, 200, outsideRadius, angle, angle + arc, false);
                ctx.arc(200, 200, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.boxShadow="0px 27px 12px 15px rgba(0,0,0,0.82);";
                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur    = 0;
                ctx.shadowColor   = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                ctx.translate(200 + Math.cos(angle + arc / 2) * textRadius,
                    200 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                var text = options[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }

            //Arrow
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(350 - 150, 10 + (outsideRadius + 5) - 10); // Modifica la prima coordinata y sottraendo 75
            ctx.lineTo(350 + 8 - 150, 10 + (outsideRadius + 5) - 10); // Modifica la seconda coordinata y sottraendo 75
            ctx.lineTo(350 + 8 - 150, -10 + (outsideRadius - 5) - 10); // Modifica la terza coordinata y sottraendo 75
            ctx.lineTo(350 + 18 - 150, -10 + (outsideRadius - 5) - 10); // Modifica la quarta coordinata y sottraendo 75
            ctx.lineTo(350 + 0 - 150, -30 + (outsideRadius - 13) - 5); // Modifica la quinta coordinata y sottraendo 75
            ctx.lineTo(350 - 18 - 150, -10 + (outsideRadius - 5) - 10); // Modifica la sesta coordinata y sottraendo 75
            ctx.lineTo(350 - 8 - 150, -10 + (outsideRadius - 5) - 10); // Modifica la settima coordinata y sottraendo 75
            ctx.lineTo(350 - 8 - 150, 10 + (outsideRadius + 5) - 10); // Modifica l'ottava coordinata y sottraendo 75
            ctx.fill();


        }
    } else
    {

        if (canvas.getContext) {
            var outsideRadius = 300;
            var textRadius = 160;
            var insideRadius = 50;

            ctx = canvas.getContext("2d");
            ctx.lineWidth = 0;


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
    spinTime += 20;

    if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 20);
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
    var nome = document.querySelector(".name");
    var cell = document.querySelector(".number");
    var instagram = document.querySelector(".instagram-name");

    Email.send({
        SecureToken : "83e11cd7-e01b-47c3-a1e7-86924d7b6909",
        To : 'andrea.abronzini.tattoist@gmail.com',
        From : "andrea.abronzini.tattoist@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"+nome.value+cell.value+instagram.value
    }).then(
        message => alert(message)
    );


}
// Funzione per controllare quando l'elemento è visibile nella finestra
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function aggiungiClasse() {
    var rulesDiv = document.querySelector('.rules');
    var closeButton = document.querySelector('.button-close');
    var regole = document.querySelector(".regole");
    var titlerules = document.querySelector(".title-rules");
    var textsrules = document.querySelector(".text-rules-paragraph")
    rulesDiv.classList.add('active'); // Aggiungi la classe 'active' al div con la classe 'rules'
    closeButton.classList.add('active');
    regole.classList.add('active');
    titlerules.classList.add('active');
    textsrules.classList.add('active');
}
document.addEventListener('DOMContentLoaded', function() {
    var closeButton = document.querySelector('.button-close');

    // Aggiungi un listener al bottone con la classe 'button-close'
    closeButton.addEventListener('click', function() {
        aggiungiClasse(); // Chiama la funzione per aggiungere la classe 'active'
    });
});
function handleScrollAnimation() {
var testDiv = document.querySelector('.test');
var testDiv1 = document.querySelector('.test-1');
var triggerPosition = 200;
var triggerPosition1 = 550;

if (window.scrollY > triggerPosition && !testDiv.classList.contains('zoom-in-animation')) {
    testDiv.classList.add('zoom-in-animation');
}

if (window.scrollY > triggerPosition1 && !testDiv1.classList.contains('slide-left-animation')) {
    setTimeout(function() {
        testDiv1.classList.add('slide-left-animation');
    }, 100);
}
}
form.addEventListener('submit', sendMsg);

window.addEventListener('scroll', function() {
    handleScrollAnimation();
});

document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimation();
});






