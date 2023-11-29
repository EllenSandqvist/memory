const startBtn = document.getElementById('start-button');

// player has 2 moves on every turn
let playerMoves = 2;

//variable for free move after finding a pair
let isFreeMove = false;

//variable to stop player from turning more than two cards at the time
let gameRunning = false;

let scoreBoard;

let playerCard1;
let playerCard2;

//variable to keep track of number of moves
let totalMoves = 0;

const gameArea = document.getElementById('game-area');

//Arrays for playcards and card pictures
const emojis = ["❤️", "❤️", "😎", "😎", "🤡", "🤡", "👽", "👽", "💩", "💩", "🦝", "🦝", "🦄", "🦄", "🐳", "🐳", "🌈", "🌈"];
const playCards= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];


// *************************** GAME START *******************************************

//add eventlistener on start-btn with function to start game
startBtn.addEventListener('click', startGame);


// ------------ Function to start game ------------------------------------
function startGame(){

    //Hide game rules and start button
    const rules = document.getElementById('rules');
    rules.classList.add('display-none');
    startBtn.classList.add('display-none');

    //Create scoreboard
    const gameControlDiv = document.querySelector('.game-control-div');
    scoreBoard = document.createElement('p');
    scoreBoard.classList.add("score-board");
    scoreBoard.textContent = "Antal drag: ";
    gameControlDiv.appendChild(scoreBoard);

    //Create a restart button
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('btn', 'restart-btn');
    restartBtn.textContent = "Börja om";
    gameControlDiv.appendChild(restartBtn);

    //add eventlistener to restart button
    restartBtn.addEventListener('click', function(){
        location.reload();
    });

    //Loop through the playCards array and create the playcards with front and backside
    playCards.forEach(function(playCard){
        //create a frontside and a backside div for each card and a parent div
        let gameCard = document.createElement('div');
        gameCard.classList.add("game-card");

        const cardDivBack = document.createElement('div');
        cardDivBack.classList.add("card-face", "card-back");
        gameCard.appendChild(cardDivBack);
    
        const cardDivFront = document.createElement('div');
        cardDivFront.classList.add("card-face", "card-front");
        gameCard.appendChild(cardDivFront);
    
        //append gameCard to gameArea
        gameArea.appendChild(gameCard);
    
        //generate random number for emojis index
        let randomNr = Math.floor(Math.random() * emojis.length);
        
        //remove emoji from array at index of random number
        let chosenEmoji = emojis.splice(randomNr, 1);
    
        cardDivFront.textContent = chosenEmoji;
    });

    //Get all elements with the HTML-class "game-card"
    const allGameCards = document.querySelectorAll('.game-card');

    allGameCards.forEach(function(card){
        card.addEventListener('click', function(){
            if(!gameRunning){
                flipCard(card);
            }
        });
    });

};


// ----------------------------------------------------------------------------------
function flipCard(card){
    if (playerMoves === 2){
        playerCard1 = card;

        //adding class for flipping card
        playerCard1.classList.add("is-flipped");
        playerMoves--;

    } else if (playerMoves === 1 && card != playerCard1) {
        playerCard2 = card;
        
        //adding class for flipping card
        playerCard2.classList.add("is-flipped");
        playerMoves--;
        
    }  
    if (playerMoves === 0) {
        gameRunning = true;
        checkPairs();
    }

    // -------------------------------------------------------------------
    function checkPairs(){
        if(playerCard1.textContent === playerCard2.textContent){
            playerCard1.classList.add('hidden-cards');
            playerCard2.classList.add('hidden-cards');

            if(!isFreeMove) {
                totalMoves++;
                scoreBoard.textContent = "Antal drag: " + totalMoves;
            }

            isFreeMove = true;
            checkCardsLeft();

        } else {
            setTimeout(function(){
                playerCard1.classList.remove("is-flipped");
                playerCard2.classList.remove("is-flipped");
                
                if(!isFreeMove) {
                    totalMoves++;
                    scoreBoard.textContent = "Antal drag: " + totalMoves;
                }

                isFreeMove = false;
                checkCardsLeft();
            }, 1200);
        }
        playerMoves = 2;
    }
}

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
function checkCardsLeft(){
    const cardsRemoved = document.querySelectorAll('.hidden-cards');
    if(cardsRemoved.length === 18){
        console.log("spelet är slut");
        gameArea.innerHTML= "";
        rules.classList.remove('display-none');
        rules.innerHTML = "💫🥇 Snyggt!!! 🥇💫<br>Du avslutade spelet på " + totalMoves + " drag."
    }
    gameRunning = false;
}