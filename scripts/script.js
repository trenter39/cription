// option variables
let gameStarted = false;
let currentTime = "Any";
let description = false;
let guess = false;

// data variables
let wordsData = [];
let currentWord = "";
let currentDescription = "";
let timerInterval;

// document elements
let activeArea = document.getElementById("active-area");
let descriptionTitle = document.getElementById('descriptionTitle');
let descriptionElement = document.getElementById('wordDescription');
let descriptionOptions = document.getElementById('description-options');
let resultArea = document.getElementById("result-area");
let startText = document.getElementById('startText');
let settings = document.getElementById('settings');
let restart = document.getElementById('restart');
let userMenu = document.getElementById('user-menu');
let time = document.getElementById('time-area');
let loginWord = document.getElementById('login');

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
    restart.innerHTML = "restart";
    startText.style.display = "none";
    userMenu.classList.add('hidden');
    settings.classList.add('hidden');
    descriptionOptions.classList.add('hidden');
    if(description === false) descriptionTitle.classList.add('hidden');
    gameStarted = true;
    
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
    time.innerHTML = currentTime;
    time.style.display = "block";
    changeTime();
    timerInterval = setInterval(changeTime, 1000);
}

// change timer text, time out - end game
function changeTime(){
    time.innerHTML = `<h1>${currentTime}</h1>`;
    if(currentTime > 0){
        currentTime--;
    } else {
        clearInterval(timerInterval);
        endGame();
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

    let inputs = document.querySelectorAll(".letter-box");
    inputs.forEach((input, index) => {

        input.addEventListener("input", () => {
            if (input.value && index < length - 1){
                inputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !input.value && index > 0){
                inputs[index - 1].focus();
            }
        });
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && gameStarted === true) checkGuess();
    });
}

// user's guess check
function checkGuess() {
    let inputs = document.querySelectorAll(".letter-box");
    let userGuess = Array.from(inputs).map(input => input.value).join("");

    if(userGuess.toLowerCase() === currentWord){
        guess = true;
    } else {
        guess = false;
    }
    changeArea();
}

// output result
function changeArea() {
    time.style.display = "none";
    userMenu.style.display = "block";
    restart.innerHTML = "next word";
    activeArea.style.display = "none";
    resultArea.style.display = "block";
    clearInterval(timerInterval);
    if(guess === true){
        resultArea.innerHTML = 
            `<h2>Word is guessed!</h2>
            <h1>${currentWord}</h1>
            <p id="wordDescription">${currentDescription}</p>`;
            console.log("Word is guessed!");
    } else {
        resultArea.innerHTML = 
            `<h2>Word is not guessed!</h2>
            <h1>${currentWord}</h1>
            <p id="wordDescription">${currentDescription}</p>`;
            console.log("Word is NOT guessed!");
    }
}

// back to main state via end game, tab
function endGame() {
    let inputs = activeArea.querySelectorAll(".letter-box");
    time.style.display = "none";
    descriptionElement.style.display = "none";
    descriptionElement.classList.add('hidden');
    descriptionOptions.classList.remove('hidden');
    descriptionTitle.classList.remove('hidden');
    settings.classList.remove('hidden');
    startText.style.display = "block";
    restart.style.display = "none";
    inputs.forEach(input => {
        activeArea.removeChild(input);
    });
    userMenu.style.display = "block";
    userMenu.classList.remove('hidden');
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
    time.innerHTML = selectedOption.textContent.trim();
}

// description option
function descriptionView(selectedOption){
    document.querySelectorAll('.settings-description').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    let value = selectedOption.textContent.trim();
    description = (value === "On") ? true : false;
    // console.log(description); // functionality debug
}

// setup function
function pageSetup(){
    window.onload = () => {
        loadWords();
        checkLogin();
    };
}

function checkLogin(){
    const username = sessionStorage.getItem("username");
    console.log(username);
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