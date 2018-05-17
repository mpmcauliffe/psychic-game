
/* DOM objects and Array */
let letters    = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    inputGuess = document.getElementById(`guess`),
    wins       = document.getElementById(`wins`),
    losses     = document.getElementById(`losses`),
    remaining  = document.getElementById(`remaining`),
    taken      = document.getElementById(`taken`);

/* global variables */
let score, fail, left, tries, input, key;


/* EVENTLISTENER:
        removes cover screen on keyup.
        uses setTimeout 1s to remove cover screen to access reset button
        calls mainController() */
window.addEventListener(`keyup`, () => {
    let screenDOM = document.querySelector(`.starter-cover`);
    screenDOM.style.animation = `1.5s fadeout .5s forwards`;
    setTimeout(() => {    
        screenDOM.style.display = `none`;
        mainController(); 
    }, 1000);
}, { once: true });


/* USER DRIVEN & INTERNAL 
        initializes and controls the game by calling the necessary functions
        called from initial EVENTLISTENER */
let mainController = () => {
       
    initializeBoard();
    let inPlay = true;

    do {
        key         = retrieveRandomLetter();
        input       = makeGuess();
        
        inputGuess.innerHTML = input;

        
        inPlay = false;
    } while (inPlay);
        
}


/* INTERNAL
        resets variables and sets the innerHTML to reflect reset
        called from mainController() */
let initializeBoard = () => {
    let score = 0,
        fail = 0,
        left = 10,
        tries = 0,
        input = "",
        key = "";

    wins.innerHTML = `wins: ${score}`;
    losses.innerHTML = `losses: ${fail}`;
    remaining.innerHTML = `remaining: ${left}`;
    taken.innerHTML = `tries: ${tries}`;
}


/* INTERNAL
        creates random number [0-25] as an index value for letters array
        called from mainController()
    RETURN
         string of single letter from letters array */
let retrieveRandomLetter = () => {
    let randomNum   = Math.floor(Math.random() * 26),
        singleLetter = letters[randomNum];
    return singleLetter;
}

let makeGuess = () => {
    window.addEventListener(`keypress`, () => {
        let x       = event.which || event.keyCode,
            press   = String.fromCharCode(x);
        return press;
    });
}