// Funções para manipular o DOM
function getDisplayValue() {
    return document.getElementById("tela").value;
}

function setDisplayValue(value) {
    document.getElementById("tela").value = value;
}

function getHistoryValue() {
    return document.getElementById("historico").value;
}

function setHistoryValue(value) {
    document.getElementById("historico").value = value;
}

// Funções para manipular a calculadora
function nmr(number) {
    setDisplayValue(getDisplayValue() + number);
}

function operador(op) {
if (getDisplayValue().slice(-1).match(/[+\-*/]/)) {
    return; // Evita operadores consecutivos
}
lastOperator = op;
lastNumber = parseFloat(getDisplayValue());
setDisplayValue(getDisplayValue() + op);
}


function clearTela() {
    setDisplayValue('');
    setHistoryValue('');
}

function removeLeadingZeros(expression) {
    return expression.replace(/\b0+([0-9]*\.?[0-9]+)\b/g, '$1');
}
let memoryValue = 0;

function memoriaAdd() {
    let displayValue = parseFloat(getDisplayValue());
    if (!isNaN(displayValue)) {
        memoryValue += displayValue;
    }
}

function memoriaSub() {
    let displayValue = parseFloat(getDisplayValue());
    if (!isNaN(displayValue)) {
        memoryValue -= displayValue;
    }
}

function memoriaRec() {
    setDisplayValue(memoryValue.toString());
}

function memoriaClear() {
    memoryValue = 0;
}

function porcentagem() {
    let displayValue = parseFloat(getDisplayValue());
    if (!isNaN(displayValue)) {
        let newValue = displayValue / 100;
        setDisplayValue(newValue.toString());
    }
}

function calculateResult() {
    let conta = getDisplayValue();
    setHistoryValue(conta);

    // Substitui os operadores
    conta = conta.replace(/÷/g, '/');
    conta = conta.replace(/×/g, '*');

    // Substitui vírgulas por pontos
    conta = conta.replace(/,/g, '.');

    // Remove os zeros à esquerda dos números
    conta = removeLeadingZeros(conta);

    // Verifica se a expressão é válida
    if (!/^[\d+\-*/\s.]+$/.test(conta)) {
        setDisplayValue('Erro');
        return;
    }

    // Verifica se a expressão termina com um operador
    if (conta.slice(-1).match(/[+\-*/]/)) {
        setDisplayValue('Erro');
        return;
    }

    try {
        const result = eval(conta);
        if (result === Infinity) {
            throw new Error('Divisão por zero');
        }
        // Converte o resultado de volta para o formato com vírgulas
        setDisplayValue(result.toString().replace('.', ','));
    } catch (error) {
        setDisplayValue('Erro');
    }
}
let lastOperator = '';
let lastNumber = 0;


function porcentagem() {
    let displayValue = parseFloat(getDisplayValue());
    if (!isNaN(displayValue) && !isNaN(lastNumber) && lastOperator) {
        let newValue = 0;
        switch (lastOperator) {
            case '+':
            case '-':
                newValue = (lastNumber * displayValue) / 100;
                break;
            case '*':
                newValue = displayValue / 100;
                break;
            case '/':
                newValue = displayValue * 100;
                break;
        }
        setDisplayValue(newValue.toString());
    }
}

function deleteLast() {
    setDisplayValue(getDisplayValue().slice(0, -1));
}