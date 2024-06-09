// DOM elements
const display = document.getElementById('display');

// Calculator state
let currentNumber = '';
let previousNumber = '';
let operator = '';
let username = '';
let expression = '';

// Append number or calculate square
function append(input) {
    if (input === '^2') {
        currentNumber = (parseFloat(currentNumber) ** 2).toString();
        expression = currentNumber;
    } else {
        if (input === '.' && currentNumber.includes('.')) {
            return; // Prevent adding multiple decimal points
        }
        currentNumber += input;
        expression += input;
    }
    display.value = expression;
}

// Custom functions to replace eval()
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error' : a / b; }
function modulo(a, b) { return b === 0 ? 'Error' : a % b; }

// Calculate the result without eval()
function calculate() {
    if (previousNumber && currentNumber && operator) {
        let num1 = parseFloat(previousNumber);
        let num2 = parseFloat(currentNumber);
        let result;

        switch (operator) {
            case '+': result = add(num1, num2); break;
            case '-': result = subtract(num1, num2); break;
            case '*': result = multiply(num1, num2); break;
            case '/': result = divide(num1, num2); break;
            case '%': result = modulo(num1, num2); break;
            default: result = 'Error';
        }

        display.value = result;
        currentNumber = result.toString();
        expression = currentNumber;
        operator = '';
        previousNumber = '';
    }
}

// Clear the display and reset calculator state
function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    expression = '';
    display.value = '';
}

// Set the operator and prepare for the next number
function setInputOperator(op) {
    if (currentNumber !== '') {
        if (operator !== '') {
            calculate();
        }
        operator = op;
        previousNumber = currentNumber;
        currentNumber = '';
        expression += ` ${op} `;
        display.value = expression;
    }
}

// Start the calculator by displaying the greeting
function startCalculator() {
    username = document.getElementById('username').value;
    let emoji = document.getElementById('emoji').value;
    document.getElementById('greeting').innerHTML = `Hello ${emoji} ${username}`;
    document.querySelector('.overlay').style.display = 'none';
}

// Backspace functionality
function backspace() {
    if (currentNumber !== '') {
        currentNumber = currentNumber.slice(0, -1);
        expression = expression.slice(0, -1);
        display.value = expression;
    }
}