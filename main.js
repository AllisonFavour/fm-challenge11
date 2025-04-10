const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("num-of-people");
const customTipInput = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll(".button-container button");
const warning = document.getElementById("warning");
const tipPerPersonDisplay = document.getElementById("js-tip-display");
const totalPerPersonDisplay = document.getElementById("js-total-display");
const resetBtn = document.querySelector(".reset-btn");

let tipPercent = 0;

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

billInput.addEventListener("input", calculateAndDisplay);

peopleInput.addEventListener("input", calculateAndDisplay);

tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tipButtons.forEach((b) => b.classList.remove("selected", "pulse-glow"));
    customTipInput.classList.remove("pulse-glow");
    customTipInput.value = "";
    btn.classList.add("selected", "pulse-glow");
    tipPercent = parseInt(btn.dataset.tip) / 100;

    const index = Array.from(tipButtons).indexOf(btn);
    localStorage.setItem('selectedTipIndex', index);
    localStorage.setItem('tipPercent', tipPercent);

    calculateAndDisplay();
  });
});

customTipInput.addEventListener("input", () => {
  tipButtons.forEach((b) => b.classList.remove("selected", "pulse-glow"));

  const customValue = parseFloat(customTipInput.value);
  if (isNaN(customValue)) {
    tipPercent = customValue / 100;
    customTipInput.classList.add('pulse-glow');

    localStorage.setItem('tipPercent', tipPercent);
    localStorage.removeItem('selectedTipIndex');
  } else {
    tipPercent = 0;
    customTipInput.classList.remove('pulse-glow');
  }

  calculateAndDisplay();
});

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipPercent = 0;

  tipButtons.forEach((b) => b.classList.remove("selected"));
  warning.classList.remove("show");

  tipPerPersonDisplay.textContent = "$0.00";
  totalPerPersonDisplay.textContent = "$0.00";

  // clear local storage
  localStorage.clear();
});

// load values on page load from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedBill = localStorage.getItem("billValue");
  const savedPeople = localStorage.getItem("peopleValue");
  const savedTip = localStorage.getItem("tipPercent");
  const selectedTipIndex = localStorage.getItem('selectedTipIndex');

  if (selectedTipIndex !== null) {
    const buttonToSelect = tipButtons[selectedTipIndex];
    buttonToSelect.classList.add("selected", "pulse-glow");
    tipPercent = parseFloat(localStorage.getItem('tipPercent')) || 0;
  } else if (savedTip) {
    customTipInput.value = parseFloat(savedTip) * 100;
    customTipInput.classList.add("pulse-glow");
    tipPercent = parseFloat(savedTip);
  }

  if (savedBill) billInput.value = savedBill;
  if (savedPeople) peopleInput.value = savedPeople;

  calculateAndDisplay();
});

document.querySelector('.js-year').textContent = new Date().getFullYear();
