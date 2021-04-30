// Tab Component
const sliderContainer = document.querySelector('.slider__tab--container');
const tabs = document.querySelectorAll('.slider__tab');
const images = document.querySelectorAll('.slider__images');
const content = document.querySelectorAll('.slider__content');

// The reason why i've included the event handlers in an if statement is to avoid
// the error i had, because the DOM finish loading after JS code is executed.

if(sliderContainer){
    // By giving a class to the button parent i can take advantage of 
    // event delegation, capturing and bubbling phases instead of use a forEach
    // for all buttons.
    sliderContainer.addEventListener('click', function(e) {
        const clicked = e.target;
       
        tabs.forEach(t => t.classList.remove('underline__active'));
        content.forEach(c => c.classList.remove('slider__content--active'));
        images.forEach(img => img.classList.remove('slider__img--active'));
    
        clicked.classList.add('underline__active');
        
        // html data-tab attribute makes the content change possible by giving same numbers in classes.
        document.querySelector(`.slider__content--${clicked.dataset.tab}`).classList.add('slider__content--active');
        document.querySelector(`.slider__img--${clicked.dataset.tab}`).classList.add('slider__img--active');
    });
}

// Form
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const month = document.querySelector('#month');
const day = document.querySelector('#day');
const year = document.querySelector('#year');
const hour = document.querySelector('#hour');
const minutes = document.querySelector('#minutes');
const peopleNumber = document.querySelector('#people-number');
const soloOrMore = document.querySelector('#solo-or-more');
const btnMinus = document.querySelector('#minus');
const btnPlus = document.querySelector('#plus');

const numMaxPeople = 50;

function setError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector("small");
    small.innerText = message;
};


function checkInputs(inputsArray) {
    inputsArray.forEach(input => {
        if(input.value.trim() === '') {
            setError(input, 'This field is required');
        }
    });
};

function setUsernameLength() {
    // Check also is not an empty string cause the functionality interfere with checkInputs()
    // which means that when the field is empty it has to show a different error message
    if(username.value.length < 3 || !username.value.trim() === '') {
        setError(username, 'Name must contain at least 3 characters');
    } else if(username.value.length > 30) {
        setError(username, 'Name must contain max 30 characters');
    }
};

function checkEmail(input) {
	const emailRegexValidation = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Check also is not an empty string cause the functionality interfere with checkInputs()
    // which means that when the field is empty it has to show a different error message
    if(!input.value.match(emailRegexValidation) || !input.value.trim() === '') {
        setError(email, 'Please use a valid email address');
    } 
};

function checkSingolarPlural() {
    if(peopleNumber.textContent === '1') {
        soloOrMore.textContent = 'person';
    } else {
        soloOrMore.textContent = 'people';
    }
};

function decreaseNumPeople(e) {
    // Being part of a form, submit is the default event of the two buttons,
    // in order to  prevent the behaviour the method needs to be here in this function
    // because it is called in the eventListener below.
    e.preventDefault();

    if(peopleNumber.textContent > 1) {
                                  // Pay attention: peopleNumber is not a number yet (in checkSingolarPlural
                                  // function), plus sign (it's like parseInt) converts the string into a number
       peopleNumber.textContent = +peopleNumber.textContent -1;
       checkSingolarPlural();
    }
};

function increaseNumPeople(e) {
    e.preventDefault();

    if(peopleNumber.textContent < numMaxPeople) {
       peopleNumber.textContent = +peopleNumber.textContent +1;
       checkSingolarPlural();
    }
};

if(btnMinus) {btnMinus.addEventListener('click', decreaseNumPeople)};

if(btnPlus) {btnPlus.addEventListener('click', increaseNumPeople)};

if(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        setUsernameLength();
        checkEmail(email);
        checkInputs([username, email, month, day, year, hour, minutes]);
     });
};