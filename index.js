const calculator = {
    displayValue: '0',
    firstNum: null,
    waitingForSecondNum: false,
    operator: null
};

const updateDisplay = () => {
    const display = document.querySelector('.calculator-screen'); // selects calc screen
    display.value = calculator.displayValue; //updates the screen
};

const inputDigit = (digit) => {
    //overwrite display if its 0
    // otherwise append the digit clicked

    if (calculator.waitingForSecondNum === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondNum = false;
    } else {
        calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
    }

    // if (calculator.displayValue === '0') {
    //     calculator.displayValue = digit;
    // } else {
    //     calculator.displayValue = calculator.displayValue + digit;
    // }
};

const inputDecimal = (dot) => {

    if (calculator.waitingForSecondNum) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondNum = false;
        return;
    }

    // check for a decimal
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    };
};

const handleOperator = (nextOperator) => {
    // convert string num to float number
    const inputValue = parseFloat(calculator.displayValue);

    if (calculator.operator && calculator.waitingForSecondNum) {
        calculator.operator = nextOperator;
        return;
    }

    if (calculator.firstNum === null && !isNaN(inputValue)) {
        calculator.firstNum = inputValue;
    }else if (calculator.operator) {
        const results = calculate(calculator.firstNum, inputValue, calculator.operator);

        calculator.displayValue = `${parseFloat(results.toFixed(7))}`;
        calculator.firstNum = results;
    }

    calculator.waitingForSecondNum = true;
    calculator.operator = nextOperator;
};

const calculate = (firstNumber, secondNum, operator) => {

    switch (operator) {
        case '+':
            return firstNumber + secondNum;
        case '-':
            return firstNumber - secondNum;
        case '*':
            return firstNumber * secondNum;
        case '/':
            return firstNumber / secondNum;
        default:
            return secondNum;
    }

    // if (operator === '+'){
    //     return firstNumber + secondNum;
    // }else if (operator === '-') {
    //     return firstNumber - secondNum;
    // }else if (operator === '*') {
    //     return firstNumber * secondNum;
    // }else if (operator === '/') {
    //     return firstNumber / secondNum;
    // }

    // return secondNum
};

const resetCalculator = () => {
    calculator.displayValue = '0',
    calculator.firstNum = null,
    calculator.waitingForSecondNum = false,
    calculator.operator = null,
    console.log(calculator)
}

updateDisplay();

const keys = document.querySelector('.calculator-keys'); // select all keys

keys.addEventListener('click', (e) => {
    //const { target } = e; //target instead of e.target
   
    //check to see if click event is a button

    if(!e.target.matches('button')) {
        return; //if click event is not a button- return
    };

    switch (e.target.value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(e.target.value);
            break;
        case '.':
            inputDecimal(e.target.value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            // check if key was an integer
            if(Number.isInteger(parseFloat(e.target.value))) {
                inputDigit(e.target.value);
            };
    };
    updateDisplay();

    // if (e.target.classList.contains('operator')) {
    //     // click was + - * /
    //     handleOperator(e.target.value)
    //     updateDisplay();
    //     return;
    // }

    // if (e.target.classList.contains('decimal')) {
    //     console.log('decimal', e.target.value);// click was .
    //     inputDecimal(e.target.value);
    //     updateDisplay();
    //     return;
    // }
    
    // if (e.target.classList.contains('all-clear')) {
    //     resetCalculator();// click was all-clear
    //     updateDisplay();
    //     return;
    // }

    // inputDigit(e.target.value); //click was a number
    // updateDisplay();
});

