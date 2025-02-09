// option variables
let gameStarted = false;
let currentTime = "Any";
let description = false;

// data variables
let wordsData = [];
let currentWord = "";
let currentDescription = "";

// shortcuts for space - start, tab - restart
document.addEventListener("keydown", function(event){
    if(event.code === "Space"){
        startGame();
        gameStarted = true;
    }
    if (event.key === "Tab") {
        event.preventDefault();
        endGame();
        let startText = document.getElementById('startText');
        startText.style.display = "block";
        gameStarted = false;
        let descriptionElement = document.getElementById('wordDescription');
        descriptionElement.style.display = "none";
    }
});

// start game via space, text click
function startGame(){
    let descriptionElement = document.getElementById('wordDescription');
    let startText = document.getElementById('startText');
    let settings = document.getElementById('settings');
    descriptionElement.classList.remove('hidden');
    startText.style.display = "none";
    settings.classList.add('hidden');

    pickRandomWord();
    descriptionElement.innerHTML = currentDescription;
    descriptionElement.style.display = (description === true) ? "block" : "none";

    createInputBlocks(currentWord.length);
    console.log("Game started!");
}

// TO SEEEEEEEEEEEEEEEEEE
function createInputBlocks(length){
    let guessArea = document.getElementById("guess-area");
    guessArea.innerHTML = "";
    
    for(let i = 0; i < length; i++){
        let input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.classList.add("letter-box");
        guessArea.appendChild(input);
    }

    let inputs = document.querySelectorAll(".letter-box");
    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value && index < length - 1){
                inputs[index + 1].focus();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") checkGuess();
    })
}

function checkGuess() {
    let inputs = document.querySelectorAll(".letter-box");
    let userGuess = Array.from(inputs).map(input => input.value).join("");
    let resultArea = document.getElementById("guess-area");
    if(userGuess.toLowerCase() === currentWord){
        resultArea.innerHTML = `
            <div id="resultContainer">
                <h1 id="resultHeading">Correct!</h1>
                <p>The word was <strong>${currentWord}</strong></p>
                <p id="wordDescription">${currentDescription}</p>
            </div>`
    } else {
        resultArea.innerHTML = `<p>Incorrect! The correct word was <strong>${currentWord}</strong></p>
                                <p id="wordDescription">${currentDescription}</p>`;
    }
}

function endGame() {
    let descriptionElement = document.getElementById('wordDescription');
    let settings = document.getElementById('settings');
    descriptionElement.classList.add('hidden');
    settings.classList.remove('hidden');
    console.log("Game ended! Options are back.");
}

// random word picker from words.json
function pickRandomWord(){
    if(wordsData.length > 0){
        const randomWordObj = wordsData[Math.floor(Math.random() * wordsData.length)];
        currentWord = randomWordObj.word;
        currentDescription = randomWordObj.description;
        // console.log("Selected word:", currentWord); // functionality debug
    }
}

// time option
function selectTime(selectedOption){
    document.querySelectorAll('.settings-time').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    let value = selectedOption.textContent.trim();
    currentTime = (value === "Any") ? "Any" : String(parseInt(value, 10));
    // console.log(currentTime); // functionality debug
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
    window.onload = loadWords;
}

// words load function
async function loadWords(){
    try {
        const response = await fetch("words.json");
        const data = await response.json();
        wordsData = data.words;
        const wordCount = data.words.length;
        document.getElementById("wordCount").textContent = `Total English: 0/${wordCount}`;
        // pickRandomWord();
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

pageSetup();