// description option
function descriptionView(selectedOption) {
    document.querySelectorAll('.settings-description').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    let value = selectedOption.textContent.trim();
    description = (value === "On") ? 'On' : 'Off';
    localStorage.setItem('blindMode', description);
    // console.log(description); // functionality debug
}

function languageChange(selectedOption) {
    document.querySelectorAll('.settings-language').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    let value = selectedOption.textContent.trim();
    language = (value === "English") ? "English" : "Ukrainian";
    localStorage.setItem('language', language);
}

// output the correct options on load
function pageSetup() {
    window.onload = () => {
        setOptions();
    };
}

// retrieve data about settings from local storage
function setOptions() {
    const storedDescriptionValue = localStorage.getItem('blindMode');
    const storedLanguageValue = localStorage.getItem('language');
    console.log(`Blind Mode: ${storedDescriptionValue}`); // debug
    console.log(`Language value: ${storedLanguageValue}`); // debug
    const description = storedDescriptionValue;
    const language = storedLanguageValue;
    const descriptionOptions = document.querySelectorAll('.settings-description');
    if (description === 'On') {
        descriptionOptions.forEach(option => {
            if (option.textContent.trim() === 'On') {
                option.classList.add('selected');
            }
        });
    } else {
        descriptionOptions.forEach(option => {
            if (option.textContent.trim() === 'Off') {
                option.classList.add('selected');
            }
        });
    }
    const languageOptions = document.querySelectorAll('.settings-language');
    if (language === 'English') {
        languageOptions.forEach(option => {
            if(option.textContent.trim() === 'English') {
                option.classList.add('selected');
            }
        });
    } else {
        languageOptions.forEach(option => {
            if(option.textContent.trim() === 'Ukrainian') {
                option.classList.add('selected');
            }
        });
    }
}

pageSetup();