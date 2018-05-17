
/* DOM objects and Array */
const letters  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    inputGuess = document.getElementById(`guess`),
    wins       = document.getElementById(`wins`),
    losses     = document.getElementById(`losses`),
    remaining  = document.getElementById(`remaining`),
    taken      = document.getElementById(`taken`),
    stat       = document.getElementById(`status`);


/* global variables */
let score, fail, left, tries, choice, hidden;


/* EVENTLISTENER
        document.getElementById(`guess`)
        -gets keypress input from the user
        -varifies the input
        -compares the input to the hidden varible 
        -updates DOM 
        -called from init() */
//let mainController = () => {
    
    document.addEventListener(`keyup`, (event) => {
        choice = "";
        // 1) extract input and make it usable
        let x = event.which || event.key,
            press = String.fromCharCode(x);
            choice = press.toLocaleLowerCase();
        console.log(choice);

        checkChar(choice);
    });
//}  
/* INTERNAL
        takes String choice 
        compares it to String hidden and executes the necessary action
        called from checkChar() */
const innerLogic = (choice) => {
    inputGuess.textContent = choice;

    if (choice === hidden) {
        stat.textContent = `You guessed it!`;
        stat.style.animation = `4s fadeout 2s forwards`;
        score++;
        left = 10;
        tries = 0;

        updateDOM(1);

    } else {
        stat.textContent = `You guessed wrong. Try again`;
        stat.style.animation = `4s fadeout 2s forwards`;

        left--;
        tries++;
        choice = ""

        updateDOM(0);
    }
    if (left < 1) {
        stat.textContent = `I was thinking of the letter ${hidden}. I'm thinking of another letter now.`;
        stat.style.animation = `6s fadeout 2s forwards`;

        fail++;
        left = 10;
        tries = 0;

        updateDOM(1);
    }
}
/* INTERNAL
        takes String argument choice
        runs choice through loop to check if it's a leter
        isLetter the function moves on to call innerLogic(choice)
        !isLetter the function produces a warning output and and calls updateDOM(0)  
        called within the EVENTLISTENER */
const checkChar = (choice) => {
    let isLetter = false;
    for (let i = 0; i < letters.length; i++) {
        if (choice === letters[i]) {
            isLetter = true;
        }
    }
    if (!isLetter) {
        stat.textContent = `please enter a letter`;
        stat.style.animation = `4s fadeout 2s forwards`;
        choice = ""
        updateDOM(0)
    } else {
        innerLogic(choice);
    }
}

/* INTERNAL 
        DOM updates in one place
        called from checkChar(), innerLogic() and init()*/
const updateDOM = (code) => {
    setTimeout(() => {
        if (code === 1) {
            retrieveRandomLetter();
        }
        wins.innerHTML = `wins: ${score}`;
        losses.innerHTML = `losses: ${fail}`;
        remaining.innerHTML = `remaining: ${left}`;
        taken.innerHTML = `tries: ${tries}`;
        inputGuess.innerHTML = "_";
        //mainController();
    }, 2000);
}

/* INTERNAL
        using random number this grabs letter from letter[] and updates the value
        of hidden
        called from event in mainController() and init() */
const retrieveRandomLetter = () => {
    let randomNum = Math.floor(Math.random() * 26),
        x = letters[randomNum];
        return x;
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
    score = 0,
    fail = 0,
    left = 10,
    tries = 0,
    choice = "",
    hidden = retrieveRandomLetter();

    
    updateDOM();
    //mainController();
}
init();




/* EVENTLISTENER:
        removes cover screen on keyup.
        uses setTimeout 1s to remove cover screen to access reset button
        calls init() */
// window.addEventListener(`keyup`, () => {
//     let screenDOM = document.querySelector(`.starter-cover`);
//     screenDOM.style.animation = `1.5s fadeout .5s forwards`;
//     setTimeout(() => {    
//         screenDOM.style.display = `none`;
//         init(); 
//     }, 1000);
// }, { once: true });
