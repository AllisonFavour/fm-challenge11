# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Welcome! 👋

Thanks for checking out this front-end coding challenge.

[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### Screenshot

![A screenshot to the solution output on Brave Browser](images/tip-calculator-ss.jpg)



### Links

- Solution URL: [Github repo to the code for the challenge](https://github.com/AllisonFavour/fm-challenge11)
- Live Site URL: [Vercel link to view the challenge](https://tip-calculator-one-virid.vercel.app)

## My process

Started with the HTML file for the content layout, under the body tag there is .main-container which is the parent to header, main, footer. 
*header* holds the logo which is centered at the middle for both mobile and desktop view.
*main* has a child element which is .flex-container a parent to .first-box and .second-box, inside the .first-box div we have the content on the left and right for desktop view and top and bottom for mobile screens, 
.first-box which is on the left side for desktop or top for mobile holds the inputs for bill, buttons for tips, also a custom input button for tips, then number of people input
.second-box which holds the tipsPerPerson, totalPerPerson and reset button.
*footer* holds the .attribution div which is a parent to the link to frontend-mentor and another link to my portfolio.

In the SCSS file started by importing the Space Mono font from google fonts, did a css reset and stored the provided colors into a scss variable, set the font-size in the root to be 18px so i can use the rem measurement property. I added comments on the containers to specify what styles relates to what section of the page.

In the Javascript file (main.js), i started by selecting the elements which will either be stored to be manipulated like the values from Bill, tip buttons (both the fixed figures and the custom input), number of people, then for DOM manipulation, warning to signify number of people can not be zero to be able to calculate the tips, then tipsPerPersonDisplay and totalPerPersonDisplay, finally there is the reset button to return all values to empty strings and 0.
Then i created a main function called calculateAndDisplay() this function calculates the tips figure to display depending on the inputs and buttons clicked, also made use of localStorage to store the values to keep it persistent after a page refresh.
Each 



### Built with

- Semantic HTML5 markup
- CSS custom properties and Flexbox
- Javascript



### What I learned

As a practice now, i make sure i visualise the figma design first and map out either mentally or a rough sketch of boxes to represent each element or sets of elements, i observed this visualization helme choose and use the right approach to achieving the desired cotent layout, using HTML AND SCSS. 
Making use of keyframes and animation to improve the display of some contents
Then Javascript for manipulation of values inputted and DOM manipulation.
Each inputs and button, calls the calculateAndDisplay() function.
Reset clears the values and clears the localStorage.

```css
// KEYFRAME FOR WARNING
@keyframes bounceFade {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 1;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.people-warning #warning {
  visibility: hidden;
  opacity: 0;
  font-size: 0.6rem;
  color: red;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &.show {
    visibility: visible;
    opacity: 1;
    animation: bounceFade 0.5s ease-out;
  }
}



// KEYFRAME FOR PULSEGLOW ON EACH BUTTON AFTER A CLICK OR REFRESH OF PAGE
@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 8px rgba(38, 194, 174, 0.4);
  }
  50% {
    box-shadow: 0 0 16px rgba(38, 194, 174, 0.9);
  }
  100% {
    box-shadow: 0 0 8px rgba(38, 194, 174, 0.4);
  }
}

.button-container button.pulse-glow,
#custom-tip.pulse-glow {
  animation: pulseGlow 1.5s ease-in-out infinite;
  background-color: #26c2ae;
  color: #00474b;
}
```

```js
function calculateAndDisplay() {
  const billValue = parseFloat(billInput.value);
  const peopleValue = parseInt(peopleInput.value);

  if (isNaN(peopleValue) || peopleValue < 1) {
    warning.classList.add("show");
  } else {
    warning.classList.remove("show");
  }

  if (
    isNaN(billValue) || billValue <= 0 || isNaN(peopleValue) || peopleValue < 1) {
    tipPerPersonDisplay.textContent = "$0.00";
    totalPerPersonDisplay.textContent = "$0.00";
    return;
  }

  if (isNaN(tipPercent)) tipPercent = 0;

  let tipAmount = billValue * tipPercent;
  let tipPerPerson = tipAmount / peopleValue;
  let totalPerPerson = (billValue + tipAmount) / peopleValue;

  tipPerPersonDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

  localStorage.setItem("billValue", billValue);
  localStorage.setItem("peopleValue", peopleValue);
  localStorage.setItem("tipPercent", tipPercent);
}
```

 


### Continued development

Ensure its responsiveness to a variety of screens and accessibility.



## Author

- Website - [Allison Favour](https://allison-favour-portfolio-darkmode.vercel.app/)
- Frontend Mentor - [@AllisonFavour](https://www.frontendmentor.io/profile/AllisonFavour)
- Twitter - [@TrillestOjay](https://x.com/TrillestOjay)


## Acknowledgments

Thanks to my resilience for being able to start and finish this project and thanks to frontend mentor for providing such a wonderful learning platform, lastly thanks to ChatGPT for code suggestions and ideas to complete the project. What a time to be alive!