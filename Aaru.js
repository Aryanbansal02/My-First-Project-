/* =========================================
   SELECT ELEMENTS
========================================= */

const pages =
    [...document.querySelectorAll(".page")];

const progressText =
    document.getElementById("progressText");

const hearts =
    document.getElementById("hearts");

const confetti =
    document.getElementById("confetti");

const messageSection =
    document.getElementById("message");

const messageLines =
    [...document.querySelectorAll("#lineMessage p")];

let resultShown = false;


/* =========================================
   PAGE NUMBERS
========================================= */

const pageNumbers = {

    home: "1 / 5",

    message: "2 / 5",

    memories: "3 / 5",

    proposal: "4 / 5",

    yesResult: "5 / 5",

    timeResult: "5 / 5",

    final: "5 / 5"
};


/* =========================================
   SHOW PAGE
========================================= */

/*
    This function hides the current section
    and displays the requested section.
*/

function showPage(id) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(id);


    if (!target) return;


    target.classList.add("active");


    progressText.textContent =
        pageNumbers[id] || "5 / 5";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    if (id === "message") {

        revealMessage();

    }

}


/* =========================================
   START BUTTON
========================================= */

document
    .getElementById("startBtn")
    .addEventListener("click", () => {

        showPage("message");

    });


/* =========================================
   LINE-BY-LINE MESSAGE
========================================= */

/*
    Each paragraph appears one after another.
*/

function revealMessage() {

    messageLines.forEach((line, index) => {

        setTimeout(() => {

            line.classList.add("visible");

        }, index * 420);

    });

}


/* =========================================
   NEXT BUTTONS
========================================= */

document
    .querySelectorAll(".next")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showPage(
                    button.dataset.next
                );

            }
        );

    });


/* =========================================
   YES BUTTON
========================================= */

/*
    When YES is clicked:

    - Show celebration page
    - Start confetti animation
*/

document
    .getElementById("yesBtn")
    .addEventListener("click", () => {

        resultShown = true;

        showPage("yesResult");

        launchConfetti();

    });


/* =========================================
   I NEED TIME BUTTON
========================================= */

/*
    IMPORTANT:

    This button is a genuine choice.

    It does NOT move.
    It does NOT disappear.
    It does NOT become impossible to click.

    It simply shows a respectful response.
*/

document
    .getElementById("timeBtn")
    .addEventListener("click", () => {

        resultShown = true;

        showPage("timeResult");

    });


/* =========================================
   RESTART
========================================= */

document
    .getElementById("restartBtn")
    .addEventListener("click", () => {

        messageLines.forEach(line => {

            line.classList.remove("visible");

        });


        resultShown = false;


        showPage("home");

    });


/* =========================================
   FLOATING HEARTS
========================================= */

/*
    Creates small hearts that float
    from the bottom of the screen.
*/

function createFloatingHeart() {

    const heart =
        document.createElement("span");


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    heart.style.left =
        `${Math.random() * 100}%`;


    heart.style.fontSize =
        `${12 + Math.random() * 20}px`;


    heart.style.animationDuration =
        `${6 + Math.random() * 5}s`;


    hearts.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 12000);

}


/*
    Create a heart every 850ms.
*/

setInterval(
    createFloatingHeart,
    850
);


/* =========================================
   CONFETTI
========================================= */

/*
    Creates the celebration animation
    after the YES button is clicked.
*/

function launchConfetti() {

    const symbols = [

        "❤️",
        "💗",
        "💕",
        "✨",
        "♥"

    ];


    for (let i = 0; i < 90; i++) {

        const piece =
            document.createElement("span");


        piece.className =
            "confetti-piece";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.animationDelay =
            `${Math.random() * 0.8}s`;


        piece.style.animationDuration =
            `${2.4 + Math.random() * 2}s`;


        confetti.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 5200);

    }

}


/* =========================================
   MESSAGE INTERSECTION OBSERVER
========================================= */

/*
    If the message section becomes visible,
    reveal the text automatically.
*/

const observer =
    new IntersectionObserver(

        entries => {

            if (entries[0].isIntersecting) {

                revealMessage();

            }

        },

        {
            threshold: 0.25
        }

    );


observer.observe(messageSection);


/* =========================================
   ESCAPE KEY
========================================= */

/*
    Pressing Escape after choosing an option
    returns to the proposal question.
*/

window.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            resultShown
        ) {

            showPage("proposal");

        }

    }
);