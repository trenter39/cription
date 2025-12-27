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
let currentWordID;
let progressData;
let timerInterval;

// document elements
let activeArea = document.getElementById("active-area");
let resultArea = document.getElementById("result-area");
let settingsArea = document.getElementById('settings-area');
let suggestArea = document.getElementById('suggest-area');
let timeArea = document.getElementById('time-area');
let timeCounter = document.getElementById('timeCounter');
let wordDescription = document.getElementById('wordDescription');
let wordLevel = document.getElementById('wordLevel');
let wordCount = document.getElementById('wordCount');
let navigation = document.getElementById('navigation');
let startText = document.getElementById('startText');
let restartText = document.getElementById('restartText');
let acceptGuess = document.getElementById('acceptGuess');
let authorizeButton = document.getElementById('authorizeButton');

// result elements
let currentWordElement = document.getElementById('currentWord');
let currentDescriptionElement = document.getElementById('currentDescription');
let firstExample = document.getElementById('firstExample');
let secondExample = document.getElementById('secondExample');
let resultText = document.getElementById('resultText');

// changeable result output
let outputTitle = "";

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
    restartText.innerHTML = "Restart";
    startText.style.display = "none";
    wordCount.classList.add('hidden');
    wordLevel.classList.remove('hidden');
    acceptGuess.style.display = "inline";
    acceptGuess.classList.remove('hidden');
    acceptGuess.classList.add('available');
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
            input.classList.add("containsLetter");
        }
        if (guessedChar === correctChar) {
            input.classList.remove("contains");
            input.classList.add("guessedLetter");
        }
        if (!currentWord.includes(guessedChar)) {
            input.classList.add("notGuessedLetter");
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
        resultText.classList.add('guessedWord');
        console.log("Word is guessed!"); // functionality debug
        markWordAsGuessed(currentWordID);
    } else {
        if (chosenTime !== "Any" && outOfTime === true) {
            outputTitle = timeIsOutOutput[Math.floor(Math.random() * timeIsOutOutput.length)];
        } else {
            outputTitle = wordNotGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        }
        resultText.classList.add('notGuessedWord');
        console.log("Word is not guessed!"); // functionality debug
        markWordAsAttempt(currentWordID);
    }
    currentWordElement.textContent = capitalizeWord(currentWord);
    currentDescriptionElement.textContent = currentDescription;
    firstExample.textContent = currentFirstExample;
    secondExample.textContent = currentSecondExample;
    resultText.textContent = outputTitle;
    resultArea.style.display = "block";
    restartText.innerHTML = "Guess next word";
}

// capitalize word on the word screen
function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// back to main state via end game, tab
function endGame() {
    let inputs = activeArea.querySelectorAll(".letter-box");
    let spaces = activeArea.querySelectorAll(".margin-div");
    timeArea.classList.add("hidden");
    wordLevel.classList.add('hidden');
    acceptGuess.classList.add('hidden');
    acceptGuess.style.display = "none";
    wordCount.classList.remove("hidden");
    wordDescription.innerHTML = "the description of word will be displayed here";
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
    changeWordCount(currentLevel);
    activeArea.style.display = "block";
    resultArea.style.display = "none";
    gameStarted = false;
    clearInterval(timerInterval);

    console.log("Home layout is back."); // functionality debug
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
        currentWordID = randomWord.id;
        currentWord = randomWord.word;
        currentDescription = randomWord.description;
        currentFirstExample = randomWord.example1;
        currentSecondExample = randomWord.example2;
        // console.log("Selected word:", currentWord); // functionality debug
    } catch (err) {
        console.error("Data isn't fetched!", err); // functionality debug
    }
}

// in case of guessing right
async function markWordAsGuessed(wordId) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const res = await fetch('/api/progress/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ word_id: wordId }),
        });
        if (res.ok) {
            progressData = await res.json();
        } else {
            console.error('Failed to update progress!');
        }
    } catch (err) {
        console.error('Error marking word as guessed:', err);
    }
}

// in case of not guessing right
async function markWordAsAttempt(wordId) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const res = await fetch('/api/progress/attempt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ word_id: wordId }),
        });
    } catch (err) {
        console.error('Error marking word as attempt:', err);
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
        setClicks();
    };
}

// set clicks
function setClicks() {
    authorizeButton.addEventListener("click", function (e) {
        window.location.href = '/login';
    });

    acceptGuess.addEventListener('click', () => {
        if (gameStarted === true && checkWordLength()) checkGuess();
    });
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

// update word counter
async function changeWordCount(wordLevel) {
    let levelData = progressData.find(obj => obj.level === wordLevel);
    if (levelData) {
        wordCount.textContent = `${wordLevel} Words: ${levelData.guessed_count}/${levelData.total_count}`;
    }
}

// load user's word progress
async function loadProgress() {
    const token = localStorage.getItem('token');
    setElements(token);
    if (!token) {
        return;
    }
    const res = await fetch('/api/progress', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) {
        console.error('Failed to fetch progress.');
        setElements(null);
        return;
    }
    const data = await res.json();
    progressData = data;
    changeWordCount(currentLevel);
}

// place areas based on the token
async function setElements(token) {
    if (!token) {
        activeArea.style.display = 'none';
        navigation.style.display = 'none';
        suggestArea.style.display = 'block';
        setTimeout(() => {
            requestAnimationFrame(() => suggestArea.classList.add('visible'));
        }, 300);
    } else {
        suggestArea.style.display = 'none';
        activeArea.style.display = 'block';
        navigation.style.display = 'block';
        setTimeout(() => {
            requestAnimationFrame(() => {
                navigation.classList.add('visible');
                activeArea.classList.add('visible');
            });
        }, 300);
    }
}