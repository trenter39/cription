// import outputs
import { wordGuessedOutput, wordNotGuessedOutput, timeIsOutOutput } from '../data/output.js';

// option variables
let chosenTime = "Any";
let gameStarted = false;
let description = true;
let isUserGuessed = false;
let hasProcessedGuess = false;
let attemptsToGuess = 3;
const constAttempts = 3;
let outOfTime;

// data variables
let currentLevel = 'B1';
let currentWord = "";
let currentDescription = "";
let currentFirstExample = "";
let currentSecondExample = "";
let progressData;
let timerInterval;

// document elements
let activeArea = document.getElementById("active-area");
let resultArea = document.getElementById("result-area");
let settingsArea = document.getElementById('settings-area');
let suggestArea = document.getElementById('suggest-area');
let timeArea = document.getElementById('time-area');
let timeCounter = document.getElementById('timeCounter');
let descriptionTitle = document.getElementById('descriptionTitle');
let wordDescription = document.getElementById('wordDescription');
let wordLevel = document.getElementById('wordLevel');
let wordCount = document.getElementById('wordCount');
let navigation = document.getElementById('navigation');
let startText = document.getElementById('startText');
let restartText = document.getElementById('restartText');
let authorizeButton = document.getElementById('authorizeButton');

// result elements
let currentWordElement = document.getElementById('currentWord');
let currentDescriptionElement = document.getElementById('currentDescription');
let firstExample = document.getElementById('firstExample');
let secondExample = document.getElementById('secondExample');
let resultText = document.getElementById('resultText');

// changeable result output
let outputTitle = "";

authorizeButton.addEventListener("click", function (e) {
    window.location.href = '/login';
});

pageSetup();

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
async function startGame() {
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
    hasProcessedGuess = false;

    let value = document.querySelector('.settings-time.selected').textContent.trim();
    chosenTime = (value === "Any") ? "Any" : parseInt(value, 10);
    if (chosenTime !== "Any") {
        setTimer();
    }

    await pickRandomWord(currentLevel);
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
    inputs[0].focus();
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
    if (hasProcessedGuess) return;
    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    let userGuess = Array.from(inputs).map(input => input.value).join("");
    isUserGuessed = userGuess.toLocaleLowerCase() === currentWord;
    if (attemptsToGuess < 1 || isUserGuessed === true) {
        hasProcessedGuess = true;
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
    activeArea.appendChild(space);

    createInputBlocks(currentWord.length);
}

// output result
function changeArea() {
    timeArea.classList.add("hidden");
    activeArea.style.display = "none";
    resultText.classList = [];
    clearInterval(timerInterval);
    if (isUserGuessed === true) {
        outputTitle = wordGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        resultText.classList.add('guessed');
        console.log("Word is guessed!"); // functionality debug
    } else {
        if (chosenTime !== "Any" && outOfTime === true) {
            outputTitle = timeIsOutOutput[Math.floor(Math.random() * timeIsOutOutput.length)];
        } else {
            outputTitle = wordNotGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        }
        resultText.classList.add('notGuessed');
        console.log("Word is NOT guessed!"); // functionality debug
    }
    currentWordElement.textContent = capitalizeWord(currentWord);
    currentDescriptionElement.textContent = currentDescription;
    firstExample.textContent = currentFirstExample;
    secondExample.textContent = currentSecondExample;
    resultText.textContent = outputTitle;
    resultArea.style.display = "block";
    restartText.innerHTML = "Click here to guess next word";
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
    settingsArea.style.display = "flex";
    settingsArea.classList.remove('hidden');
    activeArea.style.display = "block";
    resultArea.style.display = "none";
    gameStarted = false;
    clearInterval(timerInterval);

    console.log("Initial layout is back."); // functionality debug
}

// random word picker from the database
async function pickRandomWord(level) {
    try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`/api/random-word?level=${encodeURIComponent(level)}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
            console.error('Failed to fetch progress.');
            return;
        }
        const randomWord = await res.json();
        currentWord = randomWord.word;
        currentDescription = randomWord.description_en;
        currentFirstExample = randomWord.example1_en;
        currentSecondExample = randomWord.example2_en;
        console.log("Selected word:", currentWord); // functionality debug
    } catch (err) {
        console.error("Data isn't fetched!", err); // functionality debug
    }
}

// level option
function selectLevel(element) {
    document.querySelectorAll('.settings-level').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    let level = element.textContent.trim();
    currentLevel = level;
    wordLevel.textContent = level;
    changeWordCount(level);
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
async function pageSetup() {
    window.onload = async () => {
        await loadProgress();
        loadWords();
        setClicks();
    };
}

// set clicks
function setClicks() {
    startText.addEventListener('click', startGame);
    restartText.addEventListener('click', endGame);
    document.querySelectorAll('.settings-level').forEach(el => {
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
        changeWordCount(currentLevel);
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

async function changeWordCount(wordLevel) {
    let levelData = progressData.find(obj => obj.level === wordLevel);
    if (levelData) {
        wordCount.textContent = `${wordLevel} Words: ${levelData.guessed_count}/${levelData.total_count}`;
    }
}

// load user's word progress
async function loadProgress() {
    const token = localStorage.getItem('token');
    if (!token) {
        suggestArea.style.display = 'block';
        activeArea.style.display = 'none';
        navigation.style.display = 'none';
        return;
    } else {
        suggestArea.style.display = 'none';
        activeArea.style.display = 'block';
        navigation.style.display = 'block';
    }
    console.log(token);
    const res = await fetch('/api/progress', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) {
        console.error('Failed to fetch progress.');
        return;
    }
    const data = await res.json();
    console.log(data);
    progressData = data;
}