const sliderContainer = document.querySelector('.slider__tab--container');
const tabs = document.querySelectorAll('.slider__tab');
const images = document.querySelectorAll('.slider__images');
const content = document.querySelectorAll('.slider__content');

// Tab Component

// The reason why i've included all the code in an if statement is to avoid
// the error because DOM finish loading after JS code is executed.
if(sliderContainer){
    // By giving a class to the button parent i can take advantage of 
    // event delegation, bubbling and capturing instead of use a forEach
    // for all buttons.
    sliderContainer.addEventListener('click', function(e) {
        const clicked = e.target;
        
        // Guarding clause, when the click happens outside the button
        // it prevents the execution of the code below
        if(!clicked) return;
    
        tabs.forEach(t => t.classList.remove('underline__active'));
        content.forEach(c => c.classList.remove('slider__content--active'));
        images.forEach(img => img.classList.remove('slider__img--active'));
    
        clicked.classList.add('underline__active');
        
        // data-tab attribute makes change content possible by giving same numbers in classes.
        document.querySelector(`.slider__content--${clicked.dataset.tab}`).classList.add('slider__content--active');
        document.querySelector(`.slider__img--${clicked.dataset.tab}`).classList.add('slider__img--active');
    });
}