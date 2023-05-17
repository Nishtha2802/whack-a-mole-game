let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");
let startNewGameButtton = document.getElementById("startNewGame");
let pauseGameButtton = document.getElementById("pauseGame");
let grid=document.getElementsByClassName('grid')[0];
let squares = document.querySelectorAll(".square");
let score = 0;
let timeLeft = 0;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

function randomMole() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })
    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare?.id;
}

function countDown() {
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left:${timeLeft}`;

    if (timeLeft == 0) {
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display='none';

    }
}

randomMole();

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        console.log(square.id, hitPosition);
        if (square.id === hitPosition) {
            score++;
            scoreH2.innerText = `Your Score ${score}`
            hitPosition = null;

        }


    })
})

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreH2.innerHTML='Your score:0';
    timeLeft.innerHTML="Your score:60";
    grid.style.display='flex';
    pauseGameButtton.style.display='inline-block';
    pauseGameButtton.innerHTML='Pause';
    timerId=setInterval(randomMole, 1000);
    randomMoleId=setInterval(countDown, 1000);

}

function pauseResumeGame(){
    if(pauseGameButtton.textContent==='Pause'){
        clearInterval(timerId);
        clearInterval(randomMoleId)
        timerId=null;
        randomMoleId=null;
        pauseGameButtton.textContent="Resume"
}else{
    timerId=setInterval(randomMole,1000);
    randomMoleId=setInterval(countDown,1000);
    pauseGameButtton.textContent="Pause";
}
}


    squares.forEach(square=>{
        square.addEventListener('mousedown',()=>{
            if(timerId!==null){
                if(square.id===hitPosition){
                score++;
                scoreH2.innerText=`Your Score ${score}`
                hitPosition=null;
            }
        }
    })
    })

startNewGameButtton.addEventListener('click', startGame);
pauseGameButtton.addEventListener('click',pauseResumeGame)
