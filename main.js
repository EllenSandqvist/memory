const startBtn = document.getElementById('start-button');
let playerMooves = 2;
let isFreeMove = false;

let gameRunning = false;
let scoreBoard;

let playerCard1;
let playerCard2;

let totalMoves = 0;

const gameArea = document.getElementById('game-area');
const emojis = ["❤️", "❤️", "😎", "😎", "🤡", "🤡", "👽", "👽", "💩", "💩", "🦝", "🦝", "🦄", "🦄", "🐳", "🐳", "🌈", "🌈"];
const playCards= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

//add eventlistener on start-btn with function to start game
startBtn.addEventListener('click', startGame);


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
    if (playerMooves === 2){
        playerCard1 = card;

        //adding class for flipping card
        playerCard1.classList.add("is-flipped");
        playerMooves--;

    } else if (playerMooves === 1 && card != playerCard1) {
        playerCard2 = card;
        
        //adding class for flipping card
        playerCard2.classList.add("is-flipped");
        playerMooves--;
        
    }  
    if (playerMooves === 0) {
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
        playerMooves = 2;
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