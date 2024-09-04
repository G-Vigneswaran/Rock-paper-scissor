let compMove='';
let score =JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  loses:0,
  tie:0
};
let rockElem=document.querySelector('.js-rock-button');
rockElem.addEventListener('click',() =>{
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',() =>{
  playGame('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click',() =>{
  playGame('scissor');
});

document.querySelector('.js-reset-button').addEventListener('click',() =>{
  let confirmElem=document.querySelector('.js-confirmation');
  confirmElem.innerHTML=`
  Are you sure you want to reset the score?
  <button class="confirm-button js-yes-button">YES</button><button class="confirm-button js-no-button">NO</button>
  `;
  document.querySelector('.js-yes-button').addEventListener('click',()=>{
    reset();
    confirmElem.innerHTML='';
  });
  document.querySelector('.js-no-button').addEventListener('click',()=>{
    confirmElem.innerHTML='';
  });
});

function reset(){
  score ={
    wins:0,       //score.wins=0;
    loses:0,
    tie:0
  };
  localStorage.removeItem('score');
  let jsonString=JSON.stringify(score);
  localStorage.setItem('score',jsonString);

  let resultElem=document.querySelector('.result');
  resultElem.innerHTML='';
  let movesElem=document.querySelector('.moves');
  movesElem.innerHTML='';
  let scoreElem=document.querySelector('.scoreCard');
  scoreElem.innerHTML=`Wins:${score.wins} Loses:${score.loses} Ties: ${score.tie}`;
}
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissor');
  }
})

function pickCompMove()
{
  let rand=Math.random();
  let move='';
  if(rand>=0 && rand < 1/3)
  {
    move='rock';

  }
  else if(rand>=1/3 && rand < 2/3)
  {
    move='paper';
  }
  else
  {
    move='scissor';
  }
  return move;
}

function playGame(move)
{
  let moveImgPath='';
  let compMoveImgPath='';
  let result='';
  compMove=pickCompMove();
  if(move=='rock')
  {
    moveImgPath='images/rock-emoji.png'
    if(compMove==='rock')
    {
      result='Tie';
    }
    else if(compMove==='paper')
    {
      result='You lose';
    }
    else if(compMove==='scissor')
    {
      result='You win';
    }
  }

  if(move=='paper')
  {
    moveImgPath='images/paper-emoji.png'
    if(compMove==='rock')
    {
      result='You win';
    }
    else if(compMove==='paper')
    {
      result='Tie';
    }
    else if(compMove==='scissor')
    {
      result='You lose';
    }
  }

  if(move=='scissor')
  {
    moveImgPath='images/scissors-emoji.png'
    if(compMove==='rock')
    {
      result='You lose';
    }
    else if(compMove==='paper')
    {
      result='You win';
    }
    else if(compMove==='scissor')
    {
      result='Tie';
    }
  }
  if(result==='You win')
  {
    score.wins++;
  }
  else if(result=='You lose')
  {
    score.loses++;
  }
  else if(result==='Tie')
  {
    score.tie++;
  }

  if(compMove==='rock'){
    compMoveImgPath='images/rock-emoji.png'
  }
  else if(compMove==='paper'){
    compMoveImgPath='images/paper-emoji.png'
  }
  else {
    compMoveImgPath='images/scissors-emoji.png'
  }
  let jsonString=JSON.stringify(score);
  localStorage.setItem('score',jsonString);
  let resultElem=document.querySelector('.result');
  resultElem.innerHTML=result;
  let movesElem=document.querySelector('.moves');
  movesElem.innerHTML=`You <img src=${moveImgPath} class="move-img"> <img src=${compMoveImgPath} class="move-img">Computer`;
  let scoreElem=document.querySelector('.scoreCard');
  scoreElem.innerHTML=`Wins:${score.wins} Loses:${score.loses} Ties: ${score.tie}`;
  
}
let isAutoPlaying=false;
let playId;
function autoPlay()
{
  
  if(!isAutoPlaying)
  {
    playId=setInterval(function fun()
    {
      let move=pickCompMove();
      compMove=pickCompMove();
      playGame(move);
    },1000);
    isAutoPlaying=true;
  }
  else
  {
    clearInterval(playId);
    isAutoPlaying=false;
  }
}