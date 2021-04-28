// Tab Component
const sliderContainer = document.querySelector('.slider__tab--container');
const tabs = document.querySelectorAll('.slider__tab');
const images = document.querySelectorAll('.slider__images');
const content = document.querySelectorAll('.slider__content');

// The reason why i've included the code in an if statement is to avoid
// the error because DOM finish loading after JS code is executed.
if(sliderContainer){
    // By giving a class to the button parent i can take advantage of 
    // event delegation, capturing an bubbling instead of use a forEach
    // for all buttons.
    sliderContainer.addEventListener('click', function(e) {
        const clicked = e.target;
       
        tabs.forEach(t => t.classList.remove('underline__active'));
        content.forEach(c => c.classList.remove('slider__content--active'));
        images.forEach(img => img.classList.remove('slider__img--active'));
    
        clicked.classList.add('underline__active');
        
        // data-tab attribute makes change content possible by giving same numbers in classes.
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

function checkEmail(input) {
	const emailRegexValidation = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!input.value.match(emailRegexValidation)) {
        setError(email, 'Please use a valid email address');
    }  
};

function resetForm() {
    form.reset();
}

function checkSingolarPlural() {
    if(peopleNumber.textContent === '1') {
        soloOrMore.textContent = 'person';
    } else {
        soloOrMore.textContent = 'people';
    }
};

function decreaseNumPeople(e) {
    e.preventDefault();

    if(peopleNumber.textContent > 1) {
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
    
        checkInputs([username, email, month, day, year, hour, minutes]);
        checkEmail(email);
        resetForm();
     });
};