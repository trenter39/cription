// option variables
let gameStarted = false;
let currentTime = "Any";
let description = true;
let guess = false;
let addAttempts = 3;
const constAttempts = 3;
let outOfTime;

// data variables
let wordsData = [];
let currentWord = "";
let currentDescription = "";
let currentFirstExample = "";
let currentSecondExample = "";
let timerInterval;

// document elements
let activeArea = document.getElementById("active-area");
let descriptionTitle = document.getElementById('descriptionTitle');
let descriptionElement = document.getElementById('wordDescription');
let resultArea = document.getElementById("result-area");
let startText = document.getElementById('startText');
let settings = document.getElementById('settings');
let restart = document.getElementById('restart');
let userMenu = document.getElementById('user-menu');
let time = document.getElementById('time-area');
let timeCounter = document.getElementById('timeCounter');
let loginWord = document.getElementById('login');

// changeable result output
let outputTitle = "";
const wordGuessedOutput = [
    "Correct! You're on fire!",
    "Word mastered! Keep it up!",
    "Nailed it! Impressive!",
    "Spot on! Genius vibes!",
    "Bravo! You cracked it!"
];
const wordNotGuessedOutput = [
    "Oops! That wasn't it.",
    "Not quite, try again next time!",
    "Close, but not the word we needed.",
    "Wrong guess. You'll get it next time!",
    "Incorrect! Don't give up!"
];
const timeIsOutOutput = [
    "Time's up! The word slipped away!",
    "You ran out of time! Better luch next round!",
    "The clock won this time!",
    "Too slow! The word vanished.",
    "Time flew by! Maybe next time you'll catch it."
];

// shortcuts for space - start, tab - restart
document.addEventListener("keydown", function(event){
    if(event.code === "Space" && gameStarted === false){
        startGame();
    } 
    if (event.key === "Tab") {
        event.preventDefault();
        endGame();
    }
});

// start game via space, text click
function startGame(){
    descriptionElement.classList.remove('hidden');
    restart.style.display = "inline";
    restart.innerHTML = "Click here or press Tab to restart";
    startText.style.display = "none";
    userMenu.classList.add('hidden');
    settings.classList.add('hidden');
    settings.style.display = "none";
    addAttempts = constAttempts;
    gameStarted = true;
    outOfTime = false;
    
    let value = document.querySelector('.settings-time.selected').textContent.trim();
    currentTime = (value === "Any") ? "Any" : parseInt(value, 10);
    if(currentTime !== "Any"){
        userMenu.style.display = "none";
        setTimer();
    }

    pickRandomWord();
    descriptionElement.innerHTML = currentDescription;
    descriptionElement.style.display = (description === true) ? "block" : "none";

    createInputBlocks(currentWord.length);
    console.log("Game started!");
}

// set timer and interval
function setTimer(){
    timeCounter.textContent = currentTime;
    time.classList.remove("hidden");
    changeTime();
    timerInterval = setInterval(changeTime, 1000);
}

// change timer text, time out - end game
function changeTime(){
    timeCounter.textContent = currentTime;
    if(currentTime > 0){
        currentTime--;
    } else {
        clearInterval(timerInterval);
        guess = false;
        outOfTime = true;
        changeArea();
    }
}

// input area
function createInputBlocks(length){

    for(let i = 0; i < length; i++){
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
            if (input.value && index < length - 1){
                inputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !input.value && index > 0){
                inputs[index - 1].focus();
            }
            if(event.key === "ArrowRight" && index < inputs.length - 1){
                inputs[index + 1].focus();
                event.preventDefault();
            }
            if(event.key === "ArrowLeft" && index > 0){
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
function checkWordLength(){
    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    let userGuess = Array.from(inputs).map(input => input.value).join("");
    if(userGuess.length === currentWord.length) return true;
    return false;
}

// user's guess check
function checkGuess() {
    let inputs = document.querySelectorAll(".letter-box:not([disabled])");
    let userGuess = Array.from(inputs).map(input => input.value).join("");

    if(userGuess.toLowerCase() === currentWord){
        guess = true;
    } else {
        guess = false;
    }
    if(addAttempts < 1 || guess === true){
        changeArea();
        return;
    }
    addAttempts--;
    inputs.forEach((input, index) => {
        inputs[index].disabled = true;
        if(currentWord.includes(userGuess[index])){
            input.classList.add("contains");
        }
        if(userGuess[index] === currentWord[index]){
            input.classList.remove("contains");
            input.classList.add("guessed");
        }
    });
    let space = document.createElement("div");
    space.classList.add("margin-div");
    activeArea.appendChild(space);

    createInputBlocks(currentWord.length);
}

// output result
function changeArea() {
    time.classList.add("hidden");
    userMenu.style.display = "flex";
    restart.innerHTML = "Click here to guess next word";
    activeArea.style.display = "none";
    resultArea.style.display = "block";
    clearInterval(timerInterval);
    if(guess === true){
        outputTitle = wordGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        resultArea.innerHTML = 
            `<h2 class="guessed">${outputTitle}</h2>
            <div id="outputSection">
                <h2>🔍 Your word: ${currentWord}</h2>
                <p id="wordDescription">🧠 Definition: ${currentDescription}</p>
                <h2>💡 Examples:</h2>
                <p style="font-size: larger;">${currentFirstExample}</p>
                <p style="font-size: larger;">${currentSecondExample}</p>
            </div>`;
            console.log("Word is guessed!"); // functionality debug
    } else {
        if(currentTime !== "Any" && outOfTime === true){
            outputTitle = timeIsOutOutput[Math.floor(Math.random() * timeIsOutOutput.length)];
        } else{
            outputTitle = wordNotGuessedOutput[Math.floor(Math.random() * wordGuessedOutput.length)];
        }
        resultArea.innerHTML = 
            `<h2 class="notGuessed">${outputTitle}</h2>
            <div id="outputSection">
                <h2>🔍 Your word: ${currentWord}</h2>
                <p id="wordDescription">🧠 Definition: ${currentDescription}</p>
                <h2>💡 Examples:</h2>
                <p style="font-size: larger;">${currentFirstExample}</p>
                <p style="font-size: larger;">${currentSecondExample}</p>
            </div>`;
            console.log("Word is NOT guessed!"); // functionality debug
    }
}

// back to main state via end game, tab
function endGame() {
    let inputs = activeArea.querySelectorAll(".letter-box");
    let spaces = activeArea.querySelectorAll(".margin-div");
    time.classList.add("hidden");
    descriptionElement.innerHTML = "the description of word will be displayed here";
    if(description === false){
        descriptionElement.style.display = "block";
        descriptionElement.innerHTML = "the description will be hidden";
    }
    startText.style.display = "inline";
    restart.style.display = "none";
    spaces.forEach(space => {
        activeArea.removeChild(space);
    })
    inputs.forEach(input => {
        activeArea.removeChild(input);
    });
    userMenu.style.display = "flex";
    userMenu.classList.remove('hidden');
    settings.style.display = "flex";
    settings.classList.remove('hidden');
    activeArea.style.display = "block";
    resultArea.style.display = "none";
    gameStarted = false;
    clearInterval(timerInterval);

    console.log("Initial layout is back."); // functionality debug
}

// random word picker from words.json
function pickRandomWord(){
    if(wordsData.length > 0){
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

// time option
function selectTime(selectedOption){
    document.querySelectorAll('.settings-time').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    timeCounter.textContent = selectedOption.textContent.trim();
}


// setup function
function pageSetup(){
    window.onload = () => {
        loadWords();
        checkLogin();
        description = localStorage.getItem('description') === "true";
        if(description === false){
            descriptionTitle.innerHTML = "blind mode";
            descriptionElement.innerHTML = "the description will be hidden"
        }
        console.log(description); // functionality debug
    };
}

// check whether user signed in
function checkLogin(){
    const username = sessionStorage.getItem("username");
    // console.log(username); functionality debug
    if(username){
        loginWord.textContent = "";
        const usernameText = document.createTextNode(`${username}`);
        const signOutElement = document.createElement("p");
        signOutElement.textContent = "sign out";
        signOutElement.addEventListener("click", signOut);
        loginWord.appendChild(usernameText);
        loginWord.appendChild(signOutElement);
    }
}

// user sign out
function signOut(){
    sessionStorage.removeItem("username");
    location.reload();
    // console.log("signed out"); // functionality debug
}

// words load function
async function loadWords(){
    try {
        const response = await fetch("../data/words.json");
        const data = await response.json();
        wordsData = data.words;
        const wordCount = data.words.length;
        let guessWords = data.guess_words.length;
        document.getElementById("wordCount").textContent = `Total English: ${guessWords}/${wordCount}`;
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

pageSetup();