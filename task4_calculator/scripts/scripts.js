addEventListener("keydown", function(event){
    keydownEvent(event);
});

var firstDigit = '';
var secondDigit = '';
var operation = '';

function getId(id)
{
    return document.getElementById(id);
}

function backspace()
{
    var result = getId('result');
    
    if(result.value.length == 1)
        result.value = 0;
    else 
        result.value = result.value.slice(0, result.value.length - 1);
}

function negate()
{
    var result = getId('result');
    result.value = result.value * -1;
}

function isEqual()
{
    var result = getId('result');
    
    var evalExpression = eval(firstDigit + operation + secondDigit);
    
    getId('historyUl').innerHTML += "<li>" + firstDigit+ ' ' + operation + ' ' + secondDigit + ' = ' + evalExpression + "</li>";
 
    if(operation=='/' && secondDigit != 0)
        result.value = evalExpression;
}

function init()
{
    var result = getId('result');    
    result.value = 0;
    
    firstDigit = '';
    operation = '';
    
    getId('history').innerHTML = '<ul id="historyUl"></ul>';
    getId('expression').innerHTML = '';
    
    result.focus();
}

function addSymbol(symbol)
{
    var result = getId('result');

    if(symbol!='.')
    {
        if(result.value == '0')
        {
            result.value = symbol;
        }
        else
        {
            result.value += symbol;
        }
    }
    else if(symbol=='.' && result.value.indexOf('.')==-1)
    {
        result.value += symbol;
    }
    
    result.focus();
}

function keydownEvent(key)
{
    if(key.keyCode==8 && key.preventDefault)
    {
        key.returnValue = false;
        setOperation('bspace');
    }
    
    if((key.keyCode>95) && (key.keyCode<106))
    {
        var number = key.keyCode - 96;
        addSymbol(number);
    }
    else if(key.keyCode == 13)
    {
        setOperation('=');
    }
    else if((key.keyCode>47) && (key.keyCode<58))
    {
        var number = key.keyCode - 48;
        addSymbol(number);
    }
    else if(key.keyCode==190 || key.keyCode==110)
    {
        addSymbol('.');
    }
    else if(key.keyCode==107)
    {
        setOperation('+');
    }
    else if(key.keyCode==109)
    {
        setOperation('-');
    }
    else if(key.keyCode==106)
    {
        setOperation('*');
    }
    else if(key.keyCode==111)
    {
        setOperation('/');
    }
}

function setOperation(op)
{
    var result = getId('result');
    
    var tempValue = result.value;
    
    if(firstDigit!='' && op!='ce' && op!='bspace')
        secondDigit = result.value;
    
    switch(op)
    {
        case '+':
            operation = op;
            if(secondDigit!='')
                isEqual();
            break;
        
        case '-':
            operation = op;
            if(secondDigit!='')
                isEqual();
            break;
            
        case '*':
            operation = op;
            if(secondDigit!='')
                isEqual();
            break;
            
        case '/':
            operation = op;
            if(secondDigit!='')
                isEqual();
            break;
            
        case '+/-':
            negate();
            getId('historyUl').innerHTML += "<li>negate(" + tempValue + ") = " +result.value + "</li>";
            return;
            
        case '1/x':
            result.value = eval('1/'+ result.value);
            getId('historyUl').innerHTML += "<li>1/" + tempValue + " = " + result.value + "</li>";
            return;
            
        case '√':
            if(parseFloat(result.value)>0)
            {
                result.value  = Math.sqrt(result.value);    
                getId('historyUl').innerHTML += "<li>√" + tempValue + " = " + result.value + "</li>";
            } 
            else
            {
                getId('historyUl').innerHTML += "<li>√" + tempValue + " = NaN</li>";
            }
            return;
            
        case '%':
            result.value = eval(result.value + '/100');
            getId('historyUl').innerHTML += "<li>% " + tempValue + " = " + result.value + "</li>";
            return;
            
        case 'bspace':
            backspace();
            return;
        
        case 'c':
            init();
            return;
            
        case 'ce':
            result.value = '0';
            return;
        case '=':
            isEqual();
            break;
    }
    
    if(secondDigit == '')
    {
        firstDigit = result.value;
        result.value = '0';
        getId('expression').innerHTML = firstDigit+ ' ' + operation;
    }
    else
    {
        firstDigit = '';
        getId('expression').innerHTML = firstDigit;
    }
    
    secondDigit = ''; 
    result.focus();
}