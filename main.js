// player can flip 2 cards on every turn
let playerFlips = 2;

let playerCard1;
let playerCard2;

//variable to keep track of number of total moves
let totalMoves = 0;

let scoreBoard;

//variable for free move after finding a pair
let isFreeMove = false;

//variable to stop player from turning more than two cards at the time
let gameRunning = false;

//Arrays for playcards and card pictures
const emojis = ["❤️", "❤️", "😎", "😎", "🤡", "🤡", "👽", "👽", "💩", "💩", "🦝", "🦝", "🦄", "🦄", "🐳", "🐳", "🌈", "🌈"];
const playCards= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-button');


// *************************** GAME START *******************************************

//add eventlistener on start-btn with function to start game
startBtn.addEventListener('click', startGame);


// ===================== MAIN FUNCTION to start game =======================================
function startGame(){
    // Hide game rules and start button
    hideStartInfo();

    //create scoreboard and restart button
    makeScorebdAndRestartBtn();

    //set up the game board with memory cards
    setupGameBoard();

    //activate cards with eventlisteners
    activatePlayCards();
};
// =========================================================================================


// ===================== Function to hide game info =======================================
function hideStartInfo(){
    const rules = document.getElementById('rules');
    rules.classList.add('display-none');
    startBtn.classList.add('display-none');
};

// ================== Function to create scoreboard & restart button=========================
function makeScorebdAndRestartBtn(){
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
};

// =================== Function to setup Game board with playcards ==========================
function setupGameBoard(){
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
};

// =================== Function to activate playcards with eventlisteners ==========================
function activatePlayCards(){
    //Get all elements with the HTML-class "game-card"
    const allGameCards = document.querySelectorAll('.game-card');

    allGameCards.forEach(function(card){
        card.addEventListener('click', function(){
            //check if game running is true - if not cards can be flipped
            if(!gameRunning){
                flipCard(card);
            }
        });
    });
}

// =================== Function to flip cards ======================================================
function flipCard(card){
    if (playerFlips === 2){
        playerCard1 = card;

        //adding class for flipping card
        playerCard1.classList.add("is-flipped");
        playerFlips--;

    } else if (playerFlips === 1 && card != playerCard1) {
        playerCard2 = card;
        
        //adding class for flipping card
        playerCard2.classList.add("is-flipped");
        playerFlips--;
        
    }  
    if (playerFlips === 0) {
        //Setting gameRunning= true prevents player from flipping more cards
        gameRunning = true;
        checkPairs();
    }

// =================== Function to Check pairs ======================================================
    function checkPairs(){
        if(playerCard1.textContent === playerCard2.textContent){
            playerCard1.classList.add('hidden-cards');
            playerCard2.classList.add('hidden-cards');

            //isFreeMove is true if previous move yielded a pair 
            if(!isFreeMove) {
                //if isFreeMove is false a move will be added to totalMoves
                totalMoves++;
                scoreBoard.textContent = "Antal drag: " + totalMoves;
            }

            //if move yielded a par isFreeMove is changed to true
            isFreeMove = true;
            checkCardsLeft();

        } else {
            //setTimeout is used to flip back the cards aftes 1,2s
            setTimeout(function(){
                //cards are turned back by removing the "is-flipped" class
                playerCard1.classList.remove("is-flipped");
                playerCard2.classList.remove("is-flipped");
                
                if(!isFreeMove) {
                    totalMoves++;
                    scoreBoard.textContent = "Antal drag: " + totalMoves;
                }

                //if move did not yield a par isFreeMove is set to false
                isFreeMove = false;
                checkCardsLeft();
            }, 1200);
        }
        //when one move is over playerMoves is set back to 2
        playerFlips = 2;
    }
}

// =================== Function to Check if there are cards left ================================================
function checkCardsLeft(){
    const cardsRemoved = document.querySelectorAll('.hidden-cards');
    if(cardsRemoved.length === 18){
        console.log("spelet är slut");
        gameArea.innerHTML= "";
        rules.classList.remove('display-none');
        if(totalMoves < 7){
            rules.innerHTML = "💫🥇 MÄSTARNIVÅ!!! 🥇💫<br>Du avslutade spelet på otroliga " + totalMoves + " drag!"
        } else if (totalMoves >= 7 && totalMoves < 10){
            rules.innerHTML = "💫 Snyggt!!! 💫<br>Du avslutade spelet på finfina " + totalMoves + " drag."
        } else if (totalMoves >= 10 && totalMoves < 14){
            rules.innerHTML = "Godkänt! <br>Du avslutade spelet på " + totalMoves + " drag."
        } else {
            rules.innerHTML = "Träna lite mer, övning ger färdighet! <br>Du avslutade spelet på " + totalMoves + " drag."
        }
        
    }
    //When one move is over gameRunning is changed back to false
    gameRunning = false;
}