
/* DOM objects and Array */
const letters  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    inputGuess = document.getElementById(`guess`),
    wins       = document.getElementById(`wins`),
    losses     = document.getElementById(`losses`),
    remaining  = document.getElementById(`remaining`),
    taken      = document.getElementById(`taken`);

/* global variables */
let score, fail, left, tries, choice, key;


/* EVENTLISTENER:
        removes cover screen on keyup.
        uses setTimeout 1s to remove cover screen to access reset button
        calls mainController() */
window.addEventListener(`keyup`, () => {
    let screenDOM = document.querySelector(`.starter-cover`);
    screenDOM.style.animation = `1.5s fadeout .5s forwards`;
    setTimeout(() => {    
        screenDOM.style.display = `none`;
        init(); 
    }, 1000);
}, { once: true });


/* EVENTLISTENER
        -gets keypress input from the user
        -varifies the input
        -compares the input to the key varible 
        -updates DOM */
window.addEventListener(`keypress`, () => {
    let x = event.which || event.keyCode,
        press = String.fromCharCode(x);
    choice = press.toLocaleLowerCase();
    

});

/* INTERNAL
        using random number this grabs letter from letter[] and updates the value
        of key
        called from init() and keypress */
const retrieveRandomLetter = () => {
    let randomNum = Math.floor(Math.random() * 26),
        key = letters[randomNum];
}

/* EVENTLISTENER:
        resets game by calling the init() */
document.getElementById(`reset`).addEventListener(`click`, () => {
    init();
})

/* USER TRIGGER & INTERNAL 
        this function resets the board to its initial state
        called from initial EVENTLISTENER & BUTTON PRESS */
const init = () => {
    score   = 0,
    fail    = 0,
    left    = 10,
    tries   = 0,
    choice  = "",
    
    retrieveRandomLetter();

    wins.innerHTML = `wins: ${score}`;
    losses.innerHTML = `losses: ${fail}`;
    remaining.innerHTML = `remaining: ${left}`;
    taken.innerHTML = `tries: ${tries}`;    
}