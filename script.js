const calculatorKeys = document.querySelector(".calculator-keys");
const calculator = {
    calculatorDisplay: 0,
    firstOperand: null,
    waitingForSecoundOperand: false,
    secoundOperand: null,
    operation: null,
}

calculatorKeys.addEventListener('click', function(e){
    const target = e.target;

    if (!target.matches('button')){
        return; //exit the function if a button is not clicked
    }
    if (target.classList.contains('operator')){
        changeOperation(target.value);
        return;
    }
    if (target.classList.contains('equal')){
        equal();
        return;
    }
    if (target.classList.contains('decimal')){
        inputDigit('.');
        updateDisplay();
        return;
    }
    if (target.classList.contains('all-clear')){
        reset();
        return;
    }
    inputDigit(target.value);
    updateDisplay();
    
});

function inputDigit (digit) {
    if (digit ==='0' && calculator.firstOperand === null){
        return;
    }
    if (calculator.waitingForSecoundOperand === false){
        if (calculator.firstOperand === null){
            if (digit ==='.'){
                calculator.firstOperand = '0'+digit;
            }else{
            calculator.firstOperand = digit;
            }   
        }else {
        calculator.firstOperand += digit;
        }
    }else {
        if (calculator.secoundOperand === null){
            if (digit ==='.'){
                calculator.secoundOperand = '0'+digit;
            }else{
            calculator.secoundOperand = digit;
            }
        }else {
            calculator.secoundOperand += digit;
        }
    }
}

function changeOperation(inputOperation){
    calculator.operation = inputOperation
    calculator.waitingForSecoundOperand = true;
    updateDisplay();
}

function updateDisplay(){
    if (calculator.firstOperand !== null){
        calculator.calculatorDisplay = calculator.firstOperand;
    }

    if (calculator.operation !== null){
            calculator.calculatorDisplay += calculator.operation;
    }

    if(calculator.secoundOperand !== null){
        calculator.calculatorDisplay += calculator.secoundOperand;
    }
    const calculatorDisplay = document.querySelector(".calculator-screen");
    calculatorDisplay.value = calculator.calculatorDisplay;
}

function equal(){
    if (calculator.operation === '+'){
        calculator.firstOperand = parseFloat(calculator.firstOperand) + parseFloat(calculator.secoundOperand);
    }
    else if (calculator.operation === '*'){
        calculator.firstOperand = parseFloat(calculator.firstOperand) * parseFloat(calculator.secoundOperand);
    }
    else if (calculator.operation === '/'){
        calculator.firstOperand = parseFloat(calculator.firstOperand) / parseFloat(calculator.secoundOperand);
    }
    else if (calculator.operation === '-'){
        calculator.firstOperand = parseFloat(calculator.firstOperand) - parseFloat(calculator.secoundOperand);
    }
    calculator.secoundOperand = null;
    calculator.operation = null;
    updateDisplay();
}

function reset () {
    calculator.calculatorDisplay = 0;
    calculator.firstOperand = null;
    calculator.secoundOperand = null;
    calculator.waitingForSecoundOperand = false;
    calculator.operation = null;
    updateDisplay();
}