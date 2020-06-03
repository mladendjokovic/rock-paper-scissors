const choices = document.querySelectorAll('.choice');
const arr = ['scissors', 'paper', 'rock'];
const scoreContainer = document.getElementById('score');
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0
scoreContainer.textContent = score;
let compChoice;
for (let choice of choices) {
    choice.addEventListener('click', e => {
        const playerChoice = e.currentTarget.getAttribute('class').split(" ")[0];
        compChoice = arr[Math.floor(Math.random() * arr.length)];
        document.querySelector('.choices').classList.add('active');
        for (let choice of choices) {
            if(!choice.classList.contains(playerChoice)) {
                choice.style.display = "none"
            }
        }
        const target = document.querySelector('.computer-choice');
        setTimeout( () => {
            computerChoice(target, compChoice);
            setTimeout( () => {
                winner(playerChoice, compChoice)
            },400);
        }, 400);
        
    })
}

const computerChoice = (target, value) => {
    target.classList.add('choice');
    target.classList.add(`${value}`);
    target.innerHTML = `<img src="./images/icon-${value}.svg" alt="${value} choice illustration">`;
}

const result = document.querySelector('.result');


//=====================//
//POSIBLE OUTCOMES

const playerWin = () => {
    score++;
    scoreContainer.textContent = score;
    localStorage.setItem('score', score)
    result.classList.add('active');
    result.innerHTML = `<h1>YOU WIN</h1>
    <button> PLAY AGAIN </button>`;
    playAgain();
    
}
const playerLose = () => {
    score--;
    scoreContainer.textContent = score;
    localStorage.setItem('score', score)
    result.innerHTML = `<h1>YOU LOSE</h1>
    <button> PLAY AGAIN </button>`;
    result.classList.add('active');
    playAgain()
    
}
const tie = () => {
    result.innerHTML = `<h1>IT'S TIE</h1>
    <button> PLAY AGAIN </button>`;
    result.classList.add('active');
    playAgain();
    
}

//=======================//
// CREATING PLAY AGAIN BUTTON AND SETTING ALL BACK TO DEFAULT

const playAgain = () => {
    document.querySelector('button').addEventListener('click', () => {
        for(let choice of choices) {
            choice.style.display = "flex";
        };
        document.querySelector('.choices').classList.remove('active');
        document.querySelector('.computer-choice').innerHTML = "";
        document.querySelector('.computer-choice').classList.remove('choice');
        document.querySelector('.computer-choice').classList.remove(`${compChoice}`);
        result.innerHTML ="";
        result.classList.remove('active');
    })
    
}



//=======================//
// DECIDING WHO WINS

const winner = (playerChoice, compChoice) => {
    switch (compChoice) {
        case arr[0]:
            switch (playerChoice) {
                case arr[0]:
                    console.log('tie');
                    tie()
                    break;
                case arr[1]:
                    console.log('you lose');
                    playerLose();
                    break;
                case arr[2]:
                    playerWin();
                    break;
            }
            break;
        case arr[1]:
            switch (playerChoice) {
                case arr[0]:
                    console.log('you win');
                    playerWin();
                    break;
                case arr[1]:
                    console.log('tie');
                    tie()
                    break;
                case arr[2]:
                    console.log('you lose');
                    playerLose();
                    break;
            }
            break;
        case arr[2]:
            switch (playerChoice) {
                case arr[0]:
                    console.log('you lose');
                    playerLose();
                    break;
                case arr[1]:
                    playerWin();
                    console.log('you win');
                    break;
                case arr[2]:
                    tie();
                    console.log('tie');
                    break;
            }
            break;
    }
}


const modal = document.querySelector('a[type="button"]');
modal.addEventListener('click', () => {
    const rules = document.querySelector('.rules')
    rules.classList.add('active');
    document.querySelector('.close').addEventListener('click', () => {
        rules.classList.remove('active');
    });
});



// treba da se doda gradient na kraju da prikaze pobjednika i treba da iskombinuje jos lajout kada se izabere nesto
// kao i sto moram da sacuvam rezultate u localnom skladistu
// na kraju mobilni dizajn