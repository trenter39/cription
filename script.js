// option variables
let gameStarted = false;
let currentTime = "Any";
let description = false;
let guess = false;

// data variables
let wordsData = [];
let currentWord = "";
let currentDescription = "";

// shortcuts for space - start, tab - restart
document.addEventListener("keydown", function(event){
    if(event.code === "Space" && gameStarted === false){
        startGame();
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
    let descriptionTitle = document.getElementById('descriptionTitle');
    let descriptionElement = document.getElementById('wordDescription');
    let descriptionOptions = document.getElementById('description-options');
    let startText = document.getElementById('startText');
    let settings = document.getElementById('settings');
    descriptionElement.classList.remove('hidden');
    startText.style.display = "none";
    settings.classList.add('hidden');
    descriptionOptions.classList.add('hidden');
    if(description === false) descriptionTitle.classList.add('hidden');
    gameStarted = true;

    pickRandomWord();
    descriptionElement.innerHTML = currentDescription;
    descriptionElement.style.display = (description === true) ? "block" : "none";

    createInputBlocks(currentWord.length);
    console.log("Game started!");
}

// input area
function createInputBlocks(length){
    let activeArea = document.getElementById("active-area");
    
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
        if (event.key === "Enter") checkGuess();
    })
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
    let activeArea = document.getElementById("active-area");
    let resultArea = document.getElementById("result-area");
    activeArea.style.display = "none";
    resultArea.style.display = "block";
    if(guess === true){
        resultArea.innerHTML = 
            `<h2>Word is guessed!</h2>
            <h2>${currentWord}</h2>
            <p id="wordDescription">${currentDescription}</p>`;
            console.log("Word is guessed!");
    } else {
        resultArea.innerHTML = 
            `<h2>Word is not guessed!</h2>
            <h2>${currentWord}</h2>
            <p id="wordDescription">${currentDescription}</p>`;
            console.log("Word is NOT guessed!");
    }
}

// back to main state
function endGame() {
    let activeArea = document.getElementById("active-area");
    let descriptionTitle = document.getElementById('descriptionTitle');
    let descriptionElement = document.getElementById('wordDescription');
    let descriptionOptions = document.getElementById('description-options');
    let settings = document.getElementById('settings');
    descriptionElement.classList.add('hidden');
    descriptionOptions.classList.remove('hidden');
    descriptionTitle.classList.remove('hidden');
    settings.classList.remove('hidden');
    let inputs = activeArea.querySelectorAll(".letter-box");
    inputs.forEach(input => {
        activeArea.removeChild(input);
    });
    document.getElementById("active-area").style.display = "block";
    document.getElementById("result-area").style.display = "none";
    gameStarted = false;
    console.log("Game ended! Options are back.");
}

// random word picker from words.json
function pickRandomWord(){
    if(wordsData.length > 0){
        const randomWordObj = wordsData[Math.floor(Math.random() * wordsData.length)];
        currentWord = randomWordObj.word;
        currentDescription = randomWordObj.description;
        console.log("Selected word:", currentWord); // functionality debug
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
        let guessWords = data.guess_words.length;
        document.getElementById("wordCount").textContent = `Total English: ${guessWords}/${wordCount}`;
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

pageSetup();