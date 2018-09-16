/*
 * Create a list that holds all of your cards
 */

let card = document.getElementsByClassName('card');
let cards = [...card];

//declaring variable for stop/ just in case other cards open
let busy = false;


		//timers
// moves counter
let moves = 0;
let moveCounter = document.querySelector('.moves');

//timer
let timer = document.querySelector('.timer');
let time;
let startTimer = false;
let minute = 0;
let second = 0;

//winning popup
let popUp = document.getElementById('win-board');

 
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
 
//new board when refreshed
document.body.onload = createANewGameCanvas();

//New Board 
function createANewGameCanvas()
{
				// Initialize the Board

	//clean board, cards face closed
	let cardList = document.getElementsByClassName('card');
	for (let i=0; i< cards.length; i++) {
		cardList[i].classList.remove('open', 'show', 'match', 'dontCount');
	};

	
	shuffle(cards);
	//Append all items in the shuffled list 
	let deckCards = document.getElementsByClassName('deck')[0];
	for (let i=0; i < cards.length; i++) {
		deckCards.appendChild(cards[i]);
	};

	//star counter
	let star = document.getElementsByClassName('fa-star');
	star[0].style.color = 'black';
	star[1].style.color = 'black';
	star[2].style.color = 'black';


	//clicked moves
	moves = 0;
	moveCounter.innerHTML = moves;

	//reset timer
	startTimer = false;
	minute = 0;
	second = 0;
	timer.innerHTML = ` ${minute} min ${second} sec`; //add this to html
	clearInterval(time);

	popUp.classList.remove('show'); //hide pop up
}


//display the card's symbol when card is clicked
let cardClicked = function() {
	let clicked = this;
	if(clicked.classList.contains('dontCount')===false){
		if(!busy){
			clicked.classList.add('open','show');
		
		cardOpen(); //matching logic to compare cards


		if(clicked.classList.contains('dontCount')=== false) {
			moveNumber(); //matching logic to count moves
		}

		clicked.classList.add('dontCount');
		starRating(); //star rating logic 

		//measure time
		if(!startTimer) {
			countTime();
			startTimer = true;
						};

			congratulationsPopUp(); //display the pop up
	};
};
};

//Seclect open cards (Flip Up cards)
function cardOpen() {
	
let opened = document.getElementsByClassName('open');

console.log(opened.length, busy)

//If 2 cards match logic
if (opened.length === 2){
	busy = true; //no other cards will be opened at that moment
	if(opened[0].innerHTML === opened[1].innerHTML) {
		matched();
	} else {
		unmatched();
	};

};
};

//Matching conditions 
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

//*********POPUP********** //
function congratulationsPopUp(){
	let matchedCards = document.getElementsByClassName('match');

	if(matchedCards.length === 16) {
		clearInterval(time); //stop timer
		let ratingStars = document.querySelector('.stars').innerHTML;
		let finalTime = timer.innerHTML;
		popUp.classList.add('show');

		document.querySelector('.total-moves').innerHTML = moves;
		document.querySelector('.total-time').innerHTML = finalTime;
		document.querySelector('.total-rating').innerHTML = ratingStars;
	};
}

//move star counter
function starRating() {
	let star = document.getElementsByClassName('fa-star');

	if (moves <= 20) {
		star[0].style.color = 'green';
		star[1].style.color = 'green';
		star[2].style.color = 'green';
	} else if (moves > 20 && moves <= 30) {
		star[0].style.color = 'orange';
		star[1].style.color = 'orange';
		star[2].style.color = 'black';
	} else if (moves >30 ) {
		star[0].style.color = 'yellow';
		star[1].style.color = 'black';
		star[2].style.color = 'black';
	};

}


//move text counter
function moveNumber(){
	moves++;
	moveCounter.innerHTML = moves;
}

//game timer
function countTime(){
	second=1;
	time = setInterval(function(){
		timer.innerHTML = `${minute} min ${second} sec`;
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		};
	}, 1000);
}


 


 
 // event Listener for a card
 for (let i=0; i < cards.length; i++) {
 	cards[i].addEventListener('click', cardClicked);
 }

 //restart game 
let refresh = document.querySelector('.fa-repeat');
refresh.addEventListener('click', createANewGameCanvas);




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
			
	
*/
