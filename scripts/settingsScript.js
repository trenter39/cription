// description option
function descriptionView(selectedOption){
    document.querySelectorAll('.settings-description').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
    let value = selectedOption.textContent.trim();
    description = (value === "On") ? false : true;
    localStorage.setItem('description', description);
    // console.log(description); // functionality debug
}

// output the correct options on load
function pageSetup(){
    window.onload = () => {
        setOptions();
    };
}

// retrieve data about settings from local storage
function setOptions(){
    const storedValue = localStorage.getItem('description');
    console.log(storedValue);
    const description = storedValue === 'true';
    const options = document.querySelectorAll('.settings-description');
    if(description === true){
        options.forEach(option => {
            if(option.textContent.trim() === 'Off'){
                option.classList.add('selected');
            }
        });
    } else {
        options.forEach(option => {
            if(option.textContent.trim() === 'On'){
                option.classList.add('selected');
            }
        });
    }
}

pageSetup();