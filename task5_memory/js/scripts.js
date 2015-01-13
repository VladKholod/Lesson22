var cards = [1,1,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,0,0,0,0];
var cardsValues = [];
var cardsIds = [];
var flippedCards = 0;

Array.prototype.shufle = function()
{   
    for(var i = 0; i < this.length; i++)
    {
        var j = Math.floor(Math.random() * (i+1));
        var temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard()
{
    cards.shufle();
    
    flippedCards = 0;
    var output = '';
    
    for(var i = 0; i < cards.length; i++)
    {
        output+='<div id="card_' + i +
            '" class="card" onclick="flipCard(this,\'' +
            cards[i]+'\')"></div>';
    }
    
    document.getElementById('board').innerHTML = output;
}

function flipBack()
{
    var firstCard = document.getElementById(cardsIds[0]);
    var secondCard = document.getElementById(cardsIds[1]);

    firstCard.innerHTML = "";
    firstCard.style.background = 'url(img/card.png) no-repeat';

    secondCard.innerHTML = "";
    secondCard.style.background = 'url(img/card.png) no-repeat';

    cardsValues = [];
    cardsIds = [];
}

function equal()
{
    if(cardsValues[0]!=cardsValues[1])
    {
        setTimeout(flipBack, 500);
        return;
    }
    
    flippedCards += 2;
    
    cardsValues = [];
    cardsIds = [];
}

function flipCard(card, value)
{
    if(cardsValues.length == 2 || card.innerHTML != "")
        return;
    
    card.style.background = '#000';
    card.innerHTML = value;
    
    cardsValues.push(value);
    cardsIds.push(card.id);
    
    if(cardsValues.length == 2)
        equal();
    
    if(flippedCards == cards.length)
    {
        alert("Ok, you won! But..");
        newBoard();
    }
}