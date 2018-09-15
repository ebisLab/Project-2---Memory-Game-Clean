/*
 * Create a list that holds all of your cards
 */
 //exactly as below let cardSelector = document.getElementsByClassName(“card”);
let card = document.getElementsByClassName('card');
let cards = [...card];

// moves counter
let moves = 0;
//let moveCounter = document.querySelector()

//timer




//declaring variable for stop/ just in case other cards open
let busy = false;
let coutnMove = false;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




//create list item from iteration
	
function createTheGameCanvas() { //this should append to the deck class

}

function compareCards (cardA, cardB) {
}

function gameOver()
 {
 
 }
 
 //Counter SetUp
 
 //If all the cards match
 

 
 //Reset Timer
 
 
 //to stop 
 
 	
 	//clicking off the grid. 
 
 /*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//create new board with shuffled cards when page is refreshed
document.body.onload = newBoard();

//New Board 
function newBoard()
{
				//STEP 4 Initialize the Board

	//4A clean board, cards face closed
	let cardList = document.getElementsByClassName('card');
	for (let i=0; i< cards.length; i++) {
		cardList[i].classList.remove('open', 'show', 'match', 'dontCount');
	};

	//4B 
	shuffle(cards);
	//4C Append all items in the shuffled list 
	let deckCards = document.getElementsByClassName('deck')[0];
	for (let i=0; i < cards.length; i++) {
		deckCards.appendChild(cards[i]);
	};
}







//STEP 6 --- display the card's symbol when card is clicked
let cardClicked = function() {
	let clicked = this;
	if(clicked.classList.contains('dontCount')===false){
		if(!busy){
			clicked.classList.add('open','show');
		}
		cardOpen();

	}
}


//STEP 5
//Seclect open cards (Flipped Up cards)
function cardOpen() {
	//store our selector check for the class 'open' in a variable called 'opened'
let opened = document.getElementsByClassName('open');

console.log(opened.length, busy)

//Check to see if the two open cards match
// There are two cards with the class open
if (opened.length === 2){
	busy = true; //no other cards will be opened at that moment
	if(opened[0].innerHTML === opened[1].innerHTML) {
		matched();
	} else {
		unmatched();
	};

};
};

//If the cards DO match 
function matched(){
	let openCards = document.getElementsByClassName('open');

	openCards[0].classList.add('match', 'dontCount');
	openCards[1].classList.add('match', 'dontCount');
	openCards[1].classList.remove('show', 'open'); // if not match, revert
	openCards[0].classList.remove('show', 'open'); // if not match revert
	busy = false; 
}

function unmatched(){
	setTimeout(function() {
		let listOfOpenCards = document.getElementsByClassName('open');

		listOfOpenCards[1].classList.remove('show', 'open', 'dontCount');
		listOfOpenCards[0].classList.remove('show', 'open', 'dontCount');
		busy = false;
	}, 500);
}


//restart game 
let refresh = document.querySelector('.fa-repeat');
refresh.addEventListener('click', newBoard);
 
 // event Listener for a card
 for (let i=0; i < cards.length; i++) {
 	cards[i].addEventListener('click', cardClicked);
 }
 /*
 Features: When page starts, reload
all cards are face down
when you click on card 1
	it remains face up
when you click on card 2
	it faces up 
		if card 2 matches card 1 remain face up 
								change background color
			or else face down
			
	if user matches the cards the counter restarts
	or else it keeps going until the third try
					if the third try and no matches
								loose game
*/
