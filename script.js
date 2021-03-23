/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
//Global Variables
var makeARandomNumber = function(){
    return Math.floor(Math.random() * 6)+1;
}
var randoms = Array(6).fill(0).map(makeARandomNumber);
console.log(randoms)

var clueHoldTime = 1000;
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
var pattern; // [2, 5, 3, 4, 2, 1, 3, 2, 5, 6, 1, 5];
var progress = 0; 
var mistakes = 0;
var gamePlaying = false;
var volume= 0.5;
var tonePlaying = false;
var guessCounter = 0;
var counter=0;
var secondsDown=15;
var TimeIncrease=15;
var round=0;
console.log("hi");

function startGame(){
    //initialize game variables
    pattern=randoms; // creates a new pattern at the start of the game
    mistakes = 0;
    progress = 0;
    gamePlaying = true;
    // swap the Start and Stop buttons
document.getElementById("startBtn").classList.add("hidden");
document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
  
  
}
function stopGame(){
gamePlaying = false;
location.reload()
    // swap the Start and Stop buttons
document.getElementById("startBtn").classList.remove("hidden");
document.getElementById("stopBtn").classList.add("hidden");
}
// Sound Synthesis Functions
const freqMap = {
  1: playAudio1(), //250.7,
  2: playAudio2(), //329.6,
  3: playAudio3(), //392,
  4: playAudio4(), //466.2,
  5: playAudio5(), //420.7,
  6: playAudio6(), //450.8
  
}
function playMyTone(btn){ 
  //o.frequency.value = freqMap[btn]
  //g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true;
    if(btn==1){
     playAudio1();
  }
    else if(btn==2){
    playAudio2();
  }
    else if(btn==3){
    playAudio3();
  }
    else if(btn==4){
    playAudio4();
  }
    else if(btn==5){
    playAudio5();
  }
    else if(btn==6){
    playAudio6();
  }
}
 // setTimeout(function playAudio(btn){
  //  stopTone()
  //},len)

/*function startTone(btn){
  if(!tonePlaying){
    //o.frequency.value = freqMap[btn]
    //g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  if(btn==1){
    playAudio1();
  }
  else if(btn==2){
    playAudio2();
  }
  else if(btn==3){
    playAudio3();
  }
  else if(btn==4){
    playAudio4();
  }
  else if(btn==5){
    playAudio5();
  }
  else if(btn==6){
    playAudio6();
  }
    tonePlaying = true;
  }
}*/
  
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0) 
function lightButton(btn){
  document.getElementById("gamebutton"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("gamebutton"+btn).classList.remove("lit")
}
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playMyTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<= progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime; 
    delay += cluePauseTime;
    clueHoldTime=clueHoldTime-10;
  }
}

	 var timeIntervalUp;
   var timer;

function startTimer(){ 
    timeIntervalUp = setInterval(function(){countTimer()}, 1000);
    }
    function countTimer() {
        document.getElementById("count").innerHTML = "Time Remaining: " + secondsDown + " seconds";
            secondsDown--;
     
            if (secondsDown == -2 ) {
                clearInterval(timeIntervalUp);
                loseGame();
                document.getElementById("count").innerHTML = "0"
                //location.reload();
                //alert('sorry, out of time');
            }
   }
function resetTimer(){ 
    timer = setInterval(function() {countTimer();}, 1000); 
        }

function roundcount(){
    document.getElementById("Round").textContent= "Round 1 of 6";
    if(round==1){
    document.getElementById("Round").textContent= "Round 2 of 6";  
    }
    else if(round==2){
    document.getElementById("Round").textContent= "Round 3 of 6";  
    }
    else if(round==3){
    document.getElementById("Round").textContent= "Round 4 of 6";  
    }
    else if(round==4){
    document.getElementById("Round").textContent= "Round 5 of 6";  
    }
    else if(round==5){
    document.getElementById("Round").textContent= "Round 6 of 6";  
    }
}
              
function playAudio1() {
  document.getElementById("camera").play();  
}
function playAudio2() {
  document.getElementById("cranking").play();
}
function playAudio3() {
  document.getElementById("shuffle").play();
}
function playAudio4() {
  document.getElementById("focus").play();
}
function playAudio5() {
  document.getElementById("cream").play();
}
function playAudio6() {
  document.getElementById("wine").play();
}
                    
function loseGame1(){
  alert("you have 1 chance remaining");
}
function loseGame2(){
  alert("you have 0 chance remaining");
}
function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}
function winGame(){
  stopGame();
  alert("Game Over. You won! ");
}
function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  if(pattern[guessCounter] == btn){
    //Guess was correct!
    if(guessCounter == progress){
      if(progress == pattern.length-1){
        //GAME OVER: WIN!
        winGame();
      }else{
        //Pattern correct. Add next segment
        secondsDown=15+TimeIncrease; // Time icreases by 15 seconds every time the pattern increases
        resetTimer();
        //clearInterval(timeIntervalUp);
        progress++;
        playClueSequence();
        TimeIncrease+=15;
        round++;
        roundcount();
      }
    }else{
      //so far so good... check the next guess
      guessCounter++;
    }
    }else{
    //Guess was incorrect
    //GAME OVER: LOSE!
       mistakes++;
      if (mistakes==1) {
      loseGame1();
    } else if(mistakes==2){
      loseGame2();
    } else{
      loseGame();
    }
}
}


  



