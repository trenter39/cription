// import outputs
import { wordGuessedOutput, wordNotGuessedOutput, timeIsOutOutput } from '../data/output.js';

// option variables
let chosenTime = "Any";
let gameStarted = false;
let description = true;
let isUserGuessed = false;
let attemptsToGuess = 3;
const constAttempts = 3;
let outOfTime;

// data variables
let levelWordQuantity = { A1: 81, A2: 89, B1: 178, B2: 194, C1: 55, C2: 12 }; // got from the loadWordCount
let wordsData = [];
let currentWord = "";
let currentDescription = "";
let currentFirstExample = "";
let currentSecondExample = "";
let timerInterval;

// document elements
let activeArea = document.getElementById("active-area");
let resultArea = document.getElementById("result-area");
let navBarArea = document.getElementById('navbar-area');
let settingsArea = document.getElementById('settings-area');
let timeArea = document.getElementById('time-area');
let timeCounter = document.getElementById('timeCounter');
let descriptionTitle = document.getElementById('descriptionTitle');
let wordDescription = document.getElementById('wordDescription');
let wordLevel = document.getElementById('wordLevel');
let wordCount = document.getElementById('wordCount');
let startText = document.getElementById('startText');
let restartText = document.getElementById('restartText');

// changeable result output
let outputTitle = "";

// shortcuts for space - start, tab - restartText
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && gameStarted === false) {
        startGame();
    }
    if (event.key === "Tab") {
        event.preventDefault();
        endGame();
    }
});

// start game via space, text click
function startGame() {
    // navBarArea.classList.add('hidden');
    settingsArea.classList.add('hidden');
    settingsArea.style.display = "none";
    wordDescription.classList.remove('hidden');
    restartText.style.display = "inline";
    restartText.innerHTML = "Click here or press Tab to restart";
    startText.style.display = "none";
    wordCount.classList.add('hidden');
    wordLevel.classList.remove('hidden');
    attemptsToGuess = constAttempts;
    gameStarted = true;
    outOfTime = false;

    let value = document.querySelector('.settings-time.selected').textContent.trim();
    chosenTime = (value === "Any") ? "Any" : parseInt(value, 10);
    if (chosenTime !== "Any") {
        setTimer();
    }

    pickRandomWord();
    wordDescription.innerHTML = currentDescription;
    wordDescription.style.display = (description === true) ? "block" : "none";

    createInputBlocks(currentWord.length);
    console.log("Game started!");
}

// set timer and interval
function setTimer() {
    timeCounter.textContent = chosenTime;
    timeArea.classList.remove("hidden");
    changeTime();
    timerInterval = setInterval(changeTime, 1000);
}

// change timer text, time out - end game
function changeTime() {
    timeCounter.textContent = chosenTime;
    if (chosenTime > 0) {
        chosenTime--;
    } else {
        clearInterval(timerInterval);
        isUserGuessed = false;
        outOfTime = true;
        changeArea();
    }
}

// input area
function createInputBlocks(length) {
    for (let i = 0; i < length; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.classList.add("letter-box");
        if (i === 0) {
            input.classList.add("first-box");
        } else if (i === length - 1) {
            input.classList.add("last-box");
        } else {
            input.classList.add("middle-box");
        }
        activeArea.appendChild(input);
    }

    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', (event) => {
            if (!/[a-zA-Z]/.test(event.key)) {
                event.preventDefault();
            }
        });

        input.addEventListener("input", () => {
            if (input.value && index < length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
            if (event.key === "ArrowRight" && index < inputs.length - 1) {
                inputs[index + 1].focus();
                event.preventDefault();
            }
            if (event.key === "ArrowLeft" && index > 0) {
                inputs[index - 1].focus();
                event.preventDefault();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && gameStarted === true && checkWordLength()) checkGuess();
    });
}

// avoid incomplete words
function checkWordLength() {
    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    let userGuess = Array.from(inputs).map(input => input.value).join("");
    if (userGuess.length === currentWord.length) return true;
    return false;
}

// guess check
function checkGuess() {
    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    let userGuess = Array.from(inputs).map(input => input.value).join("");

    if (userGuess.toLowerCase() === currentWord) {
        isUserGuessed = true;
    } else {
        isUserGuessed = false;
    }
    if (attemptsToGuess < 1 || isUserGuessed === true) {
        changeArea();
        return;
    }
    attemptsToGuess--;
    inputs.forEach((input, index) => {
        inputs[index].disabled = true;
        const guessedChar = userGuess[index];
        const correctChar = currentWord[index];
        if (currentWord.includes(guessedChar)) {
            input.classList.add("contains");
        }
        if (guessedChar === correctChar) {
            input.classList.remove("contains");
            input.classList.add("guessed");
        }
        if (!currentWord.includes(guessedChar)) {
            input.classList.add("notGuessed");
        }
    });
    let space = document.createElement("div");
    space.classList.add("margin-div");
    activeArea.appendChild(space);

    createInputBlocks(currentWord.length);
}

// output result
function changeArea() {
    timeArea.classList.add("hidden");
    activeArea.style.display = "none";
    resultArea.style.display = "block";
    // navBarArea.style.display = "flex";
    restartText.innerHTML = "Click here to guess next word";
    clearInterval(timerInterval);
    if (isUserGuessed === true) {
        outputTitle = wordGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        resultArea.innerHTML =
            `<div id="outputSection">
                <h2>${capitalizeWord(currentWord)}</h2>
                <p id="wordDescription">${currentDescription}</p>
                <h2>Examples:</h2>
                <p style="font-size: larger;">${currentFirstExample}</p>
                <p style="font-size: larger;">${currentSecondExample}</p>
            </div>
            <h3 class="guessed">${outputTitle}</h3>`;
        console.log("Word is guessed!"); // functionality debug
    } else {
        if (chosenTime !== "Any" && outOfTime === true) {
            outputTitle = timeIsOutOutput[Math.floor(Math.random() * timeIsOutOutput.length)];
        } else {
            outputTitle = wordNotGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        }
        resultArea.innerHTML =
            `<div id="outputSection">
                <h2>${capitalizeWord(currentWord)}</h2>
                <p id="wordDescription">${currentDescription}</p>
                <h2>Examples:</h2>
                <p style="font-size: larger;">${currentFirstExample}</p>
                <p style="font-size: larger;">${currentSecondExample}</p>
            </div>
            <h3 class="notGuessed">${outputTitle}</h3>`;
        console.log("Word is NOT guessed!"); // functionality debug
    }
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// back to main state via end game, tab
function endGame() {
    let inputs = activeArea.querySelectorAll(".letter-box");
    let spaces = activeArea.querySelectorAll(".margin-div");
    timeArea.classList.add("hidden");
    wordLevel.classList.add('hidden');
    wordCount.classList.remove("hidden");
    wordDescription.innerHTML = "the description of word will be displayed here";
    if (description === false) {
        wordDescription.style.display = "block";
        wordDescription.innerHTML = "the description will be hidden";
    }
    startText.style.display = "inline";
    restartText.style.display = "none";
    spaces.forEach(space => {
        activeArea.removeChild(space);
    })
    inputs.forEach(input => {
        activeArea.removeChild(input);
    });
    // navBarArea.style.display = "flex";
    // navBarArea.classList.remove('hidden');
    settingsArea.style.display = "flex";
    settingsArea.classList.remove('hidden');
    activeArea.style.display = "block";
    resultArea.style.display = "none";
    gameStarted = false;
    clearInterval(timerInterval);

    console.log("Initial layout is back."); // functionality debug
}

// random word picker TODO
function pickRandomWord() {
    if (wordsData.length > 0) {
        const randomWordObj = wordsData[Math.floor(Math.random() * wordsData.length)];
        currentWord = randomWordObj.word;
        currentDescription = randomWordObj.description;
        currentFirstExample = randomWordObj.firstExample;
        currentSecondExample = randomWordObj.secondExample;
        console.log("Selected word:", currentWord); // functionality debug
    } else {
        console.log("Data isn't fetched!"); // functionality debug
    }
}

// level option
function selectLevel(element) {
    document.querySelectorAll('.settings-words').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    let levelText = element.textContent.trim();
    wordLevel.textContent = levelText;
    wordCount.textContent = `${levelText} Words: 0/${levelWordQuantity[levelText]}`;
}

// time option
function selectTime(element) {
    document.querySelectorAll('.settings-time').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    timeCounter.textContent = element.textContent.trim();
}

// setup page
function pageSetup() {
    window.onload = () => {
        loadWords();
        setClicks();
        description = localStorage.getItem('description') === "true";
        if (description === false) {
            descriptionTitle.innerHTML = "blind mode";
            wordDescription.innerHTML = "the description will be hidden"
        }
        console.log(description); // functionality debug
    };
}

// set clicks
function setClicks() {
    startText.addEventListener('click', startGame);
    restartText.addEventListener('click', endGame);
    document.querySelectorAll('.settings-words').forEach(el => {
        el.addEventListener('click', function () {
            selectLevel(this);
        });
    });
    document.querySelectorAll('.settings-time').forEach(el => {
        el.addEventListener('click', function () {
            selectTime(this);
        });
    });
}

// words load function
async function loadWords() {
    try {
        const response = await fetch("../data/words.json");
        const data = await response.json();
        wordsData = data.words;
        // const wordQuantity = data.words.length; // legacy purposes
        let guessWords = data.guess_words.length;
        wordCount.textContent = `B1 Words: ${guessWords}/${levelWordQuantity.B1}`;
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

pageSetup();