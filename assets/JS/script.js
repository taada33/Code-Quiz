//grabbing existing HTML elements

let startButton = document.querySelector("#start");
let headerEl = document.querySelector("header");

//creates a button which can prompt a listener to take the user to the high scores screen

let viewScores = document.createElement("button");
viewScores.setAttribute("class","viewScoresButton")
document.body.appendChild(viewScores);
viewScores.textContent = "View high scores";

//Creating timer HTML element

let timerEl = document.createElement("h2");
timerEl.setAttribute("class","timerText");
document.body.appendChild(timerEl);
timerEl.textContent = "";

//creating question div HTML element, which contains a title and a UL which stores the answer Lis
//contains an h2, a ul, and 4 lis

let questionDiv = document.createElement("div");
questionDiv.setAttribute("class","questionBox");
document.body.appendChild(questionDiv);

let questionEl = document.createElement("h2");
questionDiv.appendChild(questionEl);

let questionOl = document.createElement("ul");
questionDiv.appendChild(questionOl);

let answerLi1 = document.createElement("li");
questionOl.appendChild(answerLi1);

let answerLi2 = document.createElement("li");
questionOl.appendChild(answerLi2);

let answerLi3 = document.createElement("li");
questionOl.appendChild(answerLi3);

let answerLi4 = document.createElement("li");
questionOl.appendChild(answerLi4);

//linebreak and and string which lets the user know if they're choice was correct or not

let lineBreak = document.createElement("hr");
questionDiv.appendChild(lineBreak);

let answerEval = document.createElement("h3");
questionDiv.appendChild(answerEval);

//finalScore h3 subheading which appears on enterInitials screen

let finalScore = document.createElement("h3");
questionDiv.appendChild(finalScore);



//div that appears for initial screen for initial input 
//contains a label, an input, and a button

let initialDiv = document.createElement("div");
initialDiv.setAttribute("class","initialBox");
document.body.appendChild(initialDiv);

let initialLabel = document.createElement("label");
initialLabel.setAttribute("for", "initials")
initialLabel.textContent = "Enter Initials: "

let initialInput = document.createElement("input");
initialInput.setAttribute("id","initials");
initialInput.setAttribute("type", "text");

let initialSubmit = document.createElement("button");
initialSubmit.textContent = "Submit";

initialDiv.appendChild(initialLabel);
initialDiv.appendChild(initialInput);
initialDiv.appendChild(initialSubmit);




//div that appears on high scores screen
//contains a ul and two buttons, goBack (goes to main menu), clearScores (deletes high scores in localstorage and in variables)

let scoreDiv = document.createElement("div");
scoreDiv.setAttribute("class","scoreBox");
document.body.appendChild(scoreDiv);

let scoreList = document.createElement("ul");

let buttonDiv = document.createElement("div")

let goBack = document.createElement("button");
goBack.textContent = "Go back";

let clearScores = document.createElement("button");
clearScores.textContent = "Clear high scores";

scoreDiv.appendChild(scoreList);

let scoreDivButtons = document.createElement("div");
scoreDivButtons.setAttribute("class","scoreDivButtons");
scoreDiv.appendChild(scoreDivButtons);

scoreDivButtons.appendChild(goBack);
scoreDivButtons.appendChild(clearScores);




//div  display: none initial conditions 

questionDiv.setAttribute("style","display: none;"); 
lineBreak.setAttribute("style","Display: none;");
initialDiv.setAttribute("style","display: none");
scoreDiv.setAttribute("style","display: none");


//event Listeners

//event listener on main page, starts the quiz
startButton.addEventListener("click",() => {whatQuestion();});

//event listeners during the quiz, tells which li inside questionDiv is clicked
answerLi1.addEventListener("click",(event) => {whatQuestion(); console.log(question);});
answerLi2.addEventListener("click",(event) => {whatQuestion(); console.log(question);});
answerLi3.addEventListener("click",(event) => {whatQuestion(); console.log(question);});
answerLi4.addEventListener("click",(event) => {whatQuestion(); console.log(question);});


//event listener on enterInitials page, triggers update on localStorage variables
initialSubmit.addEventListener("click", (event) => {whatQuestion(); console.log(question)});

//goes back to main menu from high scores screen
goBack.addEventListener("click", (event) => {whatQuestion(); console.log(question)});

//clears scores on high scores menu
clearScores.addEventListener("click",function(){

    //deletes local storage items
    localStorage.removeItem("High Scores");
    localStorage.removeItem("Initials");
    
    //reinitializes global variables as their start values
    savedScores = new Array;
    initials = new Array;
    timeLeft = undefined;

    //renders the scoreboard again, updating to only 1 li with prompt to get new high scores
    renderScoreboard();
})

    //goes to high score screen from main menu
viewScores.addEventListener("click", function(){
    //hides the main menu html elements and high scores button
    viewScores.setAttribute("style", "display: none");
    headerEl.setAttribute("style","display: none");
    highScores();
   
})

//Global variable definitions
//question is the state that determines what the function whatQuestion will evaluate too
//different values will lead to different screens
let question = 1;

//timeLeft is the remaining quiz time. modified by countdown() (every 100ms) and whatQuestion() (when a question is wrong, -10 seconds)
let timeLeft;

//timeInterval is the setInterval object that starts the countdown function 
//called when the quiz begins and at 100ms intervals
//defined during countdown
let timeInterval;

//savedScores is an array numbers representing the scores from the current and previous quizzes
//is updated by timeLeft values at the end of the quiz, and storedScores when the page is refreshed
let savedScores = new Array;

//initials is an array of strings representing the user's initial inputs at the end of the quizzes
//is updated during enterInitials() at the end of the quiz, and storedInitials when the page is refreshed
let initials = new Array;

//line may not be required. sets an initial state that can be filtered
// savedScores= [];

// savedScores.push(33);

// savedScores.push(55);

// console.log("savedScores is " + savedScores);


//attempts to get storedScores and storedInitials values from localStorage
// let storedScores = JSON.parse(localStorage.getItem("High Scores"));
// let storedInitials = JSON.parse(localStorage.getItem("Initials"));

// localStorage.setItem("High Scores", JSON.stringify(savedScores));

// initials = ["ta","addd"]
// localStorage.setItem("initials", JSON.stringify(initials));


if((localStorage.getItem("High Scores")) !== null){
    console.log("here");
    
    savedScores.push(JSON.parse(localStorage.getItem("High Scores")));
    console.log(savedScores);
    initials.push(JSON.parse(localStorage.getItem("Initials")));
    console.log("savedScores is " + savedScores);
    console.log("initials are " + initials)
}

// console.log("savedScores is " + savedScores);

function countdown(){
    console.log("countdown");
    timeLeft = 500;

    let timeInterval = window.setInterval(function () {
    //question === 7 || timeLeft <= 0'
    console.log(timeInterval)
    if (question === 7 || timeLeft <= 0){

        console.log("quiz ending in countdown")
        //end of quiz reached
        timerEl.textContent = '';
        question = 6;
        clearInterval(timeInterval);
        enterInitials();  
        

        

    }else if(timeLeft > 0) {
        timerEl.textContent ='Time: ' + Math.floor(timeLeft/10);
        timeLeft--;
    }
}, 100);}

function whatQuestion(){
    (console.log("whatQuestion; question = " + question))
    // console.log(event.path[0]);
    if(event.path[0].getAttribute("data-eval") === "true"){
        lineBreak.setAttribute("style","display: block;");
        answerEval.setAttribute("style","display: block");
        answerEval.textContent = ("Correct!");
    }else if(event.path[0].getAttribute("data-eval") === "false"){
        lineBreak.setAttribute("style","display: block;")
        answerEval.textContent = ("Wrong!")
        timeLeft += -100;
        if(timeLeft <= 0){
            timeLeft = 0;
            question = 6;
            timerEl.textContent = 'Time: ' + Math.floor(timeLeft/10);
        }
        
    }

    if(question ===1){
        countdown();
        firstQuestion();
    }else if(question ===2){
        secondQuestion();
    }else if(question === 3){
        thirdQuestion();
    }else if(question === 4){
        fourthQuestion();
    }else if(question === 5){
        fifthQuestion();   
    }else if(question === 6){
        enterInitials();
    }else if(question === 7){
        highScores();
        console.log("here");  
    }else{
        mainMenu();
    }
}

function mainMenu(){
    viewScores.setAttribute("style", "display: block");
    headerEl.setAttribute("style","display: block;");
    questionDiv.setAttribute("style","display: none;");
    scoreDiv.setAttribute("style","display: none");
    question = 1;
}

function firstQuestion(){
    viewScores.setAttribute("style", "display: none");
    questionOl.setAttribute("style","display: block;")
    headerEl.setAttribute("style","display: none;");
    questionDiv.setAttribute("style","display: block;");

    questionEl.textContent = "Commonly used data types DO Not include: ";

    answerLi1.textContent = "1. strings"
    answerLi1.setAttribute("data-eval","false")
    
    answerLi2.textContent = "2. booleans"
    answerLi2.setAttribute("data-eval","false")
    
    answerLi3.textContent = "3. alerts"
    answerLi3.setAttribute("data-eval","true")

    answerLi4.textContent = "4. numbers"
    answerLi4.setAttribute("data-eval","false")

    question++;
}

function secondQuestion(){
    questionEl.textContent = "The condition in an if / else statement is enclosed with _______.";

    answerLi1.textContent = "1. quotes"
    answerLi1.setAttribute("data-eval","false")
    
    answerLi2.textContent = "2. curly brackets"
    answerLi2.setAttribute("data-eval","false")
    
    answerLi3.textContent = "3. paranthesis"
    answerLi3.setAttribute("data-eval","true")

    answerLi4.textContent = "4. square brackets"
    answerLi4.setAttribute("data-eval","false")

    question++;
}

function thirdQuestion(){
    questionEl.textContent = "Arrays in Javascript can be used to store _______.";

    answerLi1.textContent = "1. numbers and strings"
    answerLi1.setAttribute("data-eval","false")
    
    answerLi2.textContent = "2. other arrays"
    answerLi2.setAttribute("data-eval","false")
    
    answerLi3.textContent = "3. booleans"
    answerLi3.setAttribute("data-eval","false")

    answerLi4.textContent = "4. all of the above"
    answerLi4.setAttribute("data-eval","true")

    question++;
}

function fourthQuestion(){
    questionEl.textContent = "String values must be enclosed within _______ when being assigned to variables.";

    answerLi1.textContent = "1. commas"
    answerLi1.setAttribute("data-eval","false")
    
    answerLi2.textContent = "2. Curly Brackets"
    answerLi2.setAttribute("data-eval","false")
    
    answerLi3.textContent = "3. quotes"
    answerLi3.setAttribute("data-eval","true")

    answerLi4.textContent = "4. parenthesis"
    answerLi4.setAttribute("data-eval","false")

    question++;
}

function fifthQuestion(){
    questionEl.textContent = "A very useful tool used during development and debugging for printing content to the debugger is:";

    answerLi1.textContent = "1. Javascript"
    answerLi1.setAttribute("data-eval","false")
    
    answerLi2.textContent = "2. terminal/bash"
    answerLi2.setAttribute("data-eval","false")
    
    answerLi3.textContent = "3. for loops"
    answerLi3.setAttribute("data-eval","false")

    answerLi4.textContent = "4. console.log"
    answerLi4.setAttribute("data-eval","true")

    question++;
    console.log("end of fifth question")
}

function enterInitials(){
    console.log("enterInitials");
    lineBreak.setAttribute("style","display: none;");
    answerEval.setAttribute("style","display: none;");

    questionEl.textContent = "All Done!";
    finalScore.textContent = "your final score is " + Math.floor(timeLeft/10);
    finalScore.setAttribute("style","display: block");

    questionOl.setAttribute("style","display: none;");
    initialDiv.setAttribute("style","display: block");

    question++;
}

function highScores(){
    console.log("highScores");
    //shows high score header, hides
    questionDiv.setAttribute("style","display: block");
    questionOl.setAttribute("style","display: none;");
    questionEl.textContent = "High scores";
    finalScore.setAttribute("style","display: none");
    initialDiv.setAttribute("style","display: none");

    scoreDiv.setAttribute("style","display: block");

    if(timeLeft !== undefined){
        savedScores.push(Math.floor(timeLeft/10));
        savedScores = flatten(savedScores);
        // savedScores = [savedScores, Math.floor(timeLeft/10)];
        // savedScores.flat();

        initials.push(initialInput.value);
        initials = flatten(initials)
        console.log("flattened")
    }
        
        console.log(savedScores)
        initials = flatten(initials)
        savedScores = flatten(savedScores);

        sortScores(savedScores,initials);

        localStorage.removeItem("High Scores");
        localStorage.removeItem("Initials");

        localStorage.setItem("High Scores", JSON.stringify(savedScores));
        localStorage.setItem("Initials", JSON.stringify(initials));

    

    // //
    // if(JSON.parse(localStorage.getItem("High Scores")) === null){
    //     console.log("currently no high scores");
    //     if(question >1){
    //         console.log("going to high scores after quiz began")
    //         savedScores.push(Math.floor(timeLeft/10));
    //         initials.push(initialInput.value);

    //     localStorage.setItem("High Scores", JSON.stringify(savedScores));
    //     localStorage.setItem("Initials", JSON.stringify(initials));
    // }else{
    //     console.log("no high scores, and quiz hasnt started yet")
    //     renderScoreboard();
    // }}

    // console.log("highScores");

    question = 0;


    // if(savedScores[0] === -1 && question === 6){
    //     savedScores[0] = Math.floor(timeLeft/10);
    //     console.log("savedScores is " + savedScores);
    //     storedScores = JSON.parse.localStorage.getItem("High Scores");
    //     console.log("storedScores is " + storedScores)
    //     initials[0] = initialInput.value;
    //     console.log(initials[0])
    // }else if(question === 6){
    //     savedScores.push(Math.floor(timeLeft/10));
    //     console.log("savedScores is " + savedScores);
    //     initials.push(initialInput.value);        
    // }
    
    
    // // initialInput.value = "";
    // localStorage.setItem("High Scores", JSON.stringify(savedScores));
    // localStorage.setItem("Initials", JSON.stringify(initials));
    // console.log("timeLeft is " + timeLeft);
        // if(savedScores >= 0){
        //     savedScores.push(Math.floor(timeLeft/10));

        //     console.log("savedScores is " + savedScores);

        //     initials.push(initialInput.value);
        //     initialInput.value = "";

        //     localStorage.setItem("High Scores", JSON.stringify(savedScores));
        //     localStorage.setItem("Initials", JSON.stringify(initials));
        // }

    console.log("savedScores is " + savedScores);
    // storedScores = localStorage.setItem("High Scores", JSON.stringify(1));
    // storedScores = JSON.parse.localStorage.getItem("High Scores");
    // console.log("storedScores is " + storedScores)

    renderScoreboard();
    }

function renderScoreboard() {
    console.log("renderScoreboard");
    scoreList.innerHTML = "";
    if(timeLeft !== undefined){
        initials = JSON.parse(localStorage.getItem("Initials"));
        initials.flat();
        savedScores = JSON.parse(localStorage.getItem("High Scores"));
        savedScores.flat();
        console.log("flattened")
        console.log("savedScores is " + savedScores + " and is "+ typeof savedScores);


        // console.log(savedScores);
        
    
        // console.log(savedScores);
    }
    console.log(timeLeft) //is empty array
    if(savedScores.length === 0){
        let li = document.createElement("li");
        li.setAttribute("class","scoreLi");
        li.textContent = "Please complete the quiz to enter your high score!";
        scoreList.appendChild(li);
    }else{
        for (var i = 0; i < savedScores.length; i++) {
            let initial = initials[i];
            let score = savedScores[i];
      
          let li = document.createElement("li");
          li.setAttribute("class","scoreLi");
          li.textContent = (i+1) + ". " + initial + " - " + score;
          scoreList.appendChild(li);
        }

        timeLeft = undefined;
    }
  }

function sortScores(arr,arr2){
    if(arr === null){
        return;
    }
    let max = 0;
    let maxarr2 = "";
    for(let i = 0; i < arr.length;i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] < arr[j]){
                max = arr[i];
                maxarr2 = arr2[i];
                arr[i] = arr[j];
                arr2[i] = arr2[j];
                arr[j] = max;
                arr2[j] = maxarr2;
            }
        }
    }
}

//Function found online used to remove any arrays nested inside other arrays. When getting arrays from localStorage then using .push or 
//.concat to add elements, the initial array was being nested inside the new one. This fixes that problem
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }
