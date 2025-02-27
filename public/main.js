// selecteer alle cirkels
let cirkels = document.querySelectorAll(".profile-bubble");
let stopAnimation = document.querySelector(".button-stop-animatie");

// genereer nieuwe custom properties
setPropertyXY();
// genereer nieuwe custom properties om de 10s
// let cirkelAnimation = setInterval(setPropertyXY, 10000);

// Bij een click wordt een class toegevoegd aan de ge-klikte cirkel
cirkels.forEach((cirkel) => {
    cirkel.addEventListener("click", () => {
        cirkel.classList.toggle("open");

        const personName = cirkel.querySelector(".person-name");
        const personBio = cirkel.querySelector(".person-bio");

        if (personName) {
            if (cirkel.classList.contains("open")) {
                personName.style.display = "block";
            } else {
                personName.style.display = "none";
            }
        }

        if (personBio) {
            if (cirkel.classList.contains("open")) {
                personBio.style.display = "block";
            } else {
                personBio.style.display = "none";
            }
        }
    });
});

// stop animaties als de stop animatie button geklikt wordt
stopAnimation.addEventListener("click", (e) => {
    // verander de tekst in de button
    if (stopAnimation.innerText === "Start animatie") {
        stopAnimation.innerText = "Stop animatie";
    } else {
        stopAnimation.innerText = "Start animatie";
    }

    // stop de keyframe animaties
    cirkels.forEach((cirkel) => {
        cirkel.classList.toggle("static");
    });

    // zoek de parrent container en verander de layout met een class
    const parentContainer = document.querySelector(".figure-container");
    parentContainer.classList.toggle("static-main");
});

// genereer random getallen, seconden, voor de keyframe animatie
function setPropertyXY() {
    cirkels.forEach((cirkel) => {
        // https://www.w3schools.com/js/js_random.asp
        durX = Math.floor(Math.random() * 10);
        durY = Math.floor(Math.random() * 10);
        // z-index
        z = Math.floor(Math.random() * 100);

        // maak custom properties van de random seconden
        cirkel.style.setProperty("--durX", durX);
        cirkel.style.setProperty("--durY", durY);
        cirkel.style.setProperty("--z", z);
    });
}

// De overlay blijft op scherm blijft als de github link geklikt wordt en daarna terug gaat naar de squadpage
// reset wanneer de website ingeladen wordt
// https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event
// https://stackoverflow.com/questions/15640087/javascript-unchecking-all-checkboxes
window.addEventListener("pageshow", function () {
    let overlay = document.getElementById("tint");
    overlay.checked = false;
});
