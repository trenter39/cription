// User output feedback at the end of the round
import { wordGuessedOutput, wordNotGuessedOutput, timeIsOutOutput } from '../data/output.js';

// CONFIGURATION & STATE
const MAX_ATTEMPTS = 3;
let chosenTime = "Any";
let currentLevel = 'B1';

let gameStarted = false;
let isUserGuessed = false;
let hasProcessedGuess = false;
let attemptsRemaining = MAX_ATTEMPTS;
let isOutOfTime = false;

// DATA VARIABLES
let currentWord = "";
let currentDescription = "";
let currentFirstExample = "";
let currentSecondExample = "";
let currentWordID;
let progressData;
let timerInterval;

// DOM ELEMENTS
let gameArea = document.getElementById("game-area");
let resultArea = document.getElementById("result-area");
let settingsArea = document.getElementById('settings-area');
let navigationArea = document.getElementById('navigation-area');
let welcomeScreen = document.getElementById('welcome-screen');
let timeContainer = document.getElementById('time-container');
let timeCounter = document.getElementById('time-counter');
let wordDescription = document.getElementById('word-description');
let levelDisplay = document.getElementById('level-display');
let keyHints = document.getElementById('key-hints');
let startGameText = document.getElementById('start-game');
let restartGameText = document.getElementById('restart-game');
let inputContainer = document.getElementById('word-input-container');
let submitGuess = document.getElementById('submit-guess');
let authorizeButton = document.getElementById('btn-authorize');

// Word data elements
let resultWord = document.getElementById('result-word');
let resultDescription = document.getElementById('result-description');

// Result elements
let firstExample = document.getElementById('example-1');
let secondExample = document.getElementById('example-2');
let resultMessage = document.getElementById('result-message');

// Changeable result output
let outputTitle = "";

// Initialization
initGame();

// GLOBAL EVENT LISTENERS
// Shortcuts: Space (Start), Tab (Return To Menu), Enter (Submit Guess)
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !gameStarted && settingsArea.style.display !== "none") {
        startGame();
    }
    if (event.key === "Tab") {
        event.preventDefault();
        returnToMainMenu();
    }
    if (event.key === "Enter" && gameStarted && checkWordLength()) {
        checkGuess();
    }
});

// Main initialization function: loads progress and binds UI events
async function initGame() {
    window.onload = async () => {
        await loadProgress();
        bindUIControls();
    };
}

// Bind click events to UI buttons and text elements
function bindUIControls() {
    authorizeButton.addEventListener("click", function () {
        window.location.href = '/login';
    });

    submitGuess.addEventListener('click', () => {
        if (gameStarted && checkWordLength()) checkGuess();
    });

    startGameText.addEventListener('click', startGame);

    restartGameText.addEventListener('click', returnToMainMenu);

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

// GAME LOGIC
// Prepares the UI and data for a new round
async function startGame() {
    // UI updates
    settingsArea.classList.add('hidden');
    settingsArea.style.display = "none";

    wordDescription.classList.remove('hidden');

    restartGameText.style.display = "inline";
    restartGameText.innerHTML = "Restart";

    startGameText.style.display = "none";
    keyHints.classList.add('hidden');
    levelDisplay.classList.remove('hidden');

    submitGuess.style.display = "inline";
    submitGuess.classList.remove('hidden');

    attemptsRemaining = MAX_ATTEMPTS;
    gameStarted = true;
    isOutOfTime = false;
    hasProcessedGuess = false;

    // Time Setup
    let timeValue = document.querySelector('.settings-time.selected').textContent.trim();
    chosenTime = (timeValue === "Any") ? "Any" : parseInt(timeValue, 10);

    if (chosenTime !== "Any") {
        setTimer();
    }

    // Word Fetching
    await pickRandomWord(currentLevel);
    wordDescription.innerHTML = currentDescription;

    // Input Creation
    createInputBlocks(currentWord.length);
    // console.log("Game started!");
}

// Sets up the visual timer and starts the interval
function setTimer() {
    timeCounter.textContent = chosenTime;
    timeContainer.classList.remove("hidden");
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// Decrements timer. Triggered every second
function updateTimer() {
    timeCounter.textContent = chosenTime;
    if (chosenTime > 0) {
        chosenTime--;
    } else {
        clearInterval(timerInterval);
        isUserGuessed = false;
        isOutOfTime = true;
        showGameResults();
    }
}

// Generates input fields for each letter of the target word.
// Adds navigationArea logic (Arrow keys, Backspace) for these specific inputs
function createInputBlocks(length) {
    // Create inputs
    for (let i = 0; i < length; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.classList.add("letter-box");

        if (i === 0) input.classList.add("first-box");
        else if (i === length - 1) input.classList.add("last-box");
        else input.classList.add("middle-box");

        inputContainer.appendChild(input);
    }

    // Add navigationArea logic to new inputs
    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    if (inputs.length > 0) inputs[0].focus();

    inputs.forEach((input, index) => {
        // Allow only letters
        input.addEventListener('keypress', (event) => {
            if (!/[a-zA-Z]/.test(event.key)) {
                event.preventDefault();
            }
        });

        // Auto-focus next input
        input.addEventListener("input", () => {
            if (input.value && index < length - 1) {
                inputs[index + 1].focus();
            }
        });

        // Navigation (Backspace, Arrows)
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
}

// Validates if the user has filled all input fields
function checkWordLength() {
    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    let userGuess = Array.from(inputs).map(input => input.value).join("");
    return userGuess.length === currentWord.length;
}

// Processes the user's guess, updates input colors, and checks win/loss condition
function checkGuess() {
    if (hasProcessedGuess) return;

    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    let userGuess = Array.from(inputs).map(input => input.value).join("");

    isUserGuessed = userGuess.toLowerCase() === currentWord.toLowerCase();

    // Check if game should end (Win or No Attempts Left)
    if (attemptsRemaining <= 1 || isUserGuessed) {
        hasProcessedGuess = true;

        // Color the last attempts before showing results
        colorInputs(inputs, userGuess);
        setTimeout(() => showGameResults(), 500);
        return;
    }

    // If game continues
    attemptsRemaining--;
    colorInputs(inputs, userGuess);

    // Add spacer and new row
    let space = document.createElement("div");
    space.classList.add("margin-div");
    inputContainer.appendChild(space);

    createInputBlocks(currentWord.length);
}

// Helper to color inputs based on correctness
function colorInputs(inputs, userGuess) {
    inputs.forEach((input, index) => {
        input.disabled = true;
        const guessedChar = userGuess[index].toLowerCase();
        const correctChar = currentWord[index].toLowerCase();
        if (guessedChar === correctChar) input.classList.add("guessedLetter");
        else if (currentWord.includes(guessedChar)) input.classList.add("containsLetter");
        else input.classList.add("notGuessedLetter");
    });
}

// Transitions from Active Game Area to Result Area
function showGameResults() {
    timeContainer.classList.add("hidden");
    gameArea.style.display = "none";
    resultMessage.className = "";
    clearInterval(timerInterval);

    if (isUserGuessed) {
        outputTitle = wordGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        resultMessage.classList.add('guessedWord');
        // console.log("Word is guessed!");
        markWordAsGuessed(currentWordID);
    } else {
        if (chosenTime !== "Any" && isOutOfTime) {
            outputTitle = timeIsOutOutput[Math.floor(Math.random() * timeIsOutOutput.length)];
        } else {
            outputTitle = wordNotGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        }
        resultMessage.classList.add('notGuessedWord');
        // console.log("Word is not guessed!");
        markWordAsAttempt(currentWordID);
    }

    // Output word data to DOM elements
    resultWord.textContent = capitalizeWord(currentWord);
    resultDescription.textContent = currentDescription;
    firstExample.textContent = currentFirstExample;
    secondExample.textContent = currentSecondExample;
    resultMessage.textContent = outputTitle;

    resultArea.style.display = "block";
    restartGameText.innerHTML = "Guess next word";
}

// Resets the game state and returns to the main settings menu
function returnToMainMenu() {
    // UI Resets
    inputContainer.innerHTML = "";

    timeContainer.classList.add("hidden");
    levelDisplay.classList.add('hidden');

    submitGuess.classList.add('hidden');
    submitGuess.style.display = "none";

    keyHints.classList.remove("hidden");
    wordDescription.innerHTML = "the description of word will be displayed here";

    startGameText.style.display = "inline";
    restartGameText.style.display = "none";

    settingsArea.style.display = "flex";
    settingsArea.classList.remove('hidden');

    updateLevelStat(currentLevel);

    gameArea.style.display = "block";
    resultArea.style.display = "none";

    gameStarted = false;
    clearInterval(timerInterval);

    // console.log("Home layout is back.");
}

// UTILITIES

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function selectLevel(element) {
    document.querySelectorAll('.settings-level').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    currentLevel = element.textContent.trim().substring(0, 2);
    levelDisplay.textContent = currentLevel;
}

function selectTime(element) {
    document.querySelectorAll('.settings-time').forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
    timeCounter.textContent = element.textContent.trim();
}

async function updateLevelStat(level) {
    if (!progressData) return;
    let levelData = progressData.find(obj => obj.level === level);
    let guessed = levelData.guessed_count;
    let total = levelData.total_count;
    const countElement = document.getElementById(`level-stat-${level.toLowerCase()}`);
    if (countElement && guessed < total) {
        countElement.textContent = `${guessed++}/${total}`;
    }
}

function setLevelStats() {
    if (!progressData) return;
    progressData.forEach(levelObj => {
        const level = levelObj.level;
        const guessed = levelObj.guessed_count;
        const total = levelObj.total_count;
        if (isNaN(total)) return;
        const countElement = document.getElementById(`level-stat-${level.toLowerCase()}`);
        if (countElement) {
            countElement.textContent = `${guessed}/${total}`;
        }
    });
}

// API INTERACTION

async function pickRandomWord(level) {
    try {
        const res = await fetch(
            `/api/random-word?level=${encodeURIComponent(level)}`,
            { credentials: 'include' }
        );

        if (res.status === 401) {
            updateUIStateBasedOnAuth(false);
            return;
        }

        if (!res.ok) throw new Error('Failed to fetch word!');

        const randomWord = await res.json();

        currentWordID = randomWord.id;
        currentWord = randomWord.word;
        currentDescription = randomWord.description;
        currentFirstExample = randomWord.example1;
        currentSecondExample = randomWord.example2;
    } catch (err) {
        console.error("Word fetch error:", err);
    }
}

async function markWordAsGuessed(wordId) {
    try {
        const res = await fetch('/api/progress/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ word_id: wordId })
        });

        if (res.status === 401) {
            updateUIStateBasedOnAuth(false);
            return;
        }

        if (!res.ok) {
            console.error('Failed to update progress');
            return;
        }

        progressData = await res.json();
        setLevelStats();
    } catch (err) {
        console.error('Guess update error:', err);
    }
}

async function markWordAsAttempt(wordId) {
    try {
        const res = await fetch('/api/progress/attempt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ word_id: wordId }),
        });

        if (res.status === 401) {
            updateUIStateBasedOnAuth(false);
        }

    } catch (err) {
        console.error('Attempt update error:', err);
    }
}

async function loadProgress() {
    try {
        const res = await fetch('/api/progress',
            { credentials: 'include' }
        );

        if (res.status === 401) {
            updateUIStateBasedOnAuth(false);
            return;
        }

        if (!res.ok) {
            console.error('Failed to fetch progress');
            return;
        }

        progressData = await res.json();
        updateUIStateBasedOnAuth(true);
        setLevelStats();
    } catch (err) {
        console.error('Progress load error:', err);
        updateUIStateBasedOnAuth(false);
    }
}

async function updateUIStateBasedOnAuth(isAuthenticated) {
    if (!isAuthenticated) {
        gameArea.style.display = 'none';
        navigationArea.style.display = 'none';
        welcomeScreen.style.display = 'block';
        setTimeout(() => {
            requestAnimationFrame(() => welcomeScreen.classList.add('visible'));
        }, 300);
    } else {
        welcomeScreen.style.display = 'none';
        gameArea.style.display = 'block';
        navigationArea.style.display = 'block';
        setTimeout(() => {
            requestAnimationFrame(() => {
                navigationArea.classList.add('visible');
                gameArea.classList.add('visible');
            });
        }, 300);
    }
}