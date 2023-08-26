const rockBtnEl = document.getElementById('js-rock-button').addEventListener('click', ()=>{
    playerMove('rock');
});

const paperBtnEl = document.getElementById('js-paper-button').addEventListener('click', ()=>{
    playerMove('paper');
});

const scissorsBtnEl = document.getElementById('js-scissors-button').addEventListener('click', ()=>{
    playerMove('scissors');
});

const moveTextEl = document.getElementById('js-moves-text');

const resultTextEl = document.getElementById('js-result-text');

const scoreEl = document.getElementById('js-score-text');

let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    Tie: 0,
};

const resetBtnEl = document.getElementById('js-reset-button').addEventListener('click', ()=>{
    //resetScore();
    showConfirmationMessage()
})


function resetScore() {
    score.win  = 0;
    score.lose = 0;
    score.Tie = 0
    localStorage.removeItem('score');
    scoreEl.innerHTML = `Win: ${score.win},   Lose: ${score.lose},   Tie: ${score.Tie}`;
}

const autoPlayBtnEl = document.querySelector('.autoPlay-button').addEventListener('click', ()=>{
    autoPlay();
})



let IntervalId;

let isAutoPlaying = false;


function autoPlay() {

    if (!isAutoPlaying) {
        IntervalId = setInterval(()=>{
            const playerMoves = computerMove();
            playerMove(playerMoves);
        }, 1000);

        isAutoPlaying = true;

        document.querySelector('.autoPlay-button').innerHTML = 'Stop AutoPlaying';

    } else {
        clearInterval(IntervalId);

        isAutoPlaying = false;

        document.querySelector('.autoPlay-button').innerHTML = ' AutoPlay';
    }
    
}

function playerMove(playerMove) {
    const computerMoves = computerMove();

    let result = '';

    if (playerMove === 'rock') {
        if (computerMoves === 'rock') {
            result = 'Tie'
        } else if  (computerMoves === 'paper') {
            result = 'You lose';
        } else if (computerMoves === 'scissors') {
            result = 'You Win';
        }
    } else if (playerMove === 'paper') {
        if (computerMoves === 'paper') {
            result = 'Tie';
        } else if (computerMoves === 'scissors') {
            result = 'You lose';
        } else if (computerMoves === 'rock') {
            result = 'You Win';
        }
    } else if (playerMove === 'scissors') {
        if (computerMoves === 'scissors') {
            result = 'Tie';
        } else if (computerMoves === 'rock') {
            result = 'You lose';
        } else if (computerMoves === 'paper') {
            result = 'You Win';
        }
    }

    if (result === 'Tie') {
        resultTextEl.style.color = 'White';
    } else if (result === 'You lose') {
        resultTextEl.style.color = 'Red';
    } else if (result === 'You Win') {
        resultTextEl.style.color = 'Green';
    }

    if (result === 'Tie') {
        score.Tie += 1;
        console.log(score)
    } else if (result === 'You lose') {
        score.lose += 1;
        console.log(score)
    } else if (result === 'You Win') {
        score.win += 1;
        console.log(score)
    }

    moveTextEl.innerHTML = `You <img class="rock-image" src="images/${playerMove}.png" alt="" id="">
    <img class="rock-image" src="images/${computerMoves}.png" alt=""> Computer`;

    /*
    moveTextEl.innerHTML = `You picks ${playerMove}. Computer picks ${computerMoves}`;
    */
    scoreEl.innerHTML = `Win: ${score.win},   Lose: ${score.lose},   Tie: ${score.Tie}`;

    resultTextEl.innerHTML = result
    console.log(result)

    storeData();
}


function computerMove() {
    const randomNumber = Math.random()

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/2) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/2 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove= 'scissors';
    }
    
    return computerMove;
}


function storeData() {
    localStorage.setItem('score', JSON.stringify(score))
}

document.body.addEventListener('keydown', (event) => {
    console.log(event)
    if (event.key === 'Backspace') {
        showConfirmationMessage()
        resetScore();
    } else if (event.key === 'a') {
        autoPlay()
    }
})

function showConfirmationMessage() {
    document.getElementById('js-confirmation-message').innerHTML = `<p> Are you sure you want to reset the score? <button class="confirmation-button-yes" id="js-confirmation-button-yes">Yes</button><button class="confirmation-button-no" id="js-confirmation-button-no">No</button> </p>`;

    document.querySelector('.confirmation-button-yes').addEventListener('click', ()=>{
        resetScore();
        hideResetMessage();
    })

    document.querySelector('.confirmation-button-no').addEventListener('click', ()=>{
        hideResetMessage();
    })
}


function hideResetMessage() {
    document.getElementById('js-confirmation-message').innerHTML = '';
}

