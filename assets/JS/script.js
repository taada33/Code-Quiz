let startButton = document.querySelector("#start");
let headerEl = document.querySelector("header");

let timerEl = document.createElement("h2");
timerEl.setAttribute("class","timerText");
document.body.appendChild(timerEl);
timerEl.textContent = "";

let questionDiv = document.createElement("div");
questionDiv.setAttribute("style","display: none;");
questionDiv.setAttribute("class","questionBox");
document.body.appendChild(questionDiv);

let questionEl = document.createElement("h2");
questionDiv.appendChild(questionEl);

let finalScore = document.createElement("h3");
questionDiv.appendChild(finalScore);

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

let lineBreak = document.createElement("hr");
lineBreak.setAttribute("style","Display: none;");
questionDiv.appendChild(lineBreak);

let answerEval = document.createElement("h3");
questionDiv.appendChild(answerEval);

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


initialDiv.setAttribute("style","display: none");

//high scores

let scoreDiv = document.createElement("div");
scoreDiv.setAttribute("class","initialBox");
document.body.appendChild(scoreDiv);

let scoreList = document.createElement("ul");


let goBack = document.createElement("button");
goBack.textContent = "Go back";

let clearScores = document.createElement("button");
clearScores.textContent = "Clear high scores";

scoreDiv.appendChild(scoreList);
scoreDiv.appendChild(goBack);
scoreDiv.appendChild(clearScores);


scoreDiv.setAttribute("style","display: none");

let question = 1;
console.log(question);

answerLi1.addEventListener("click",(event) => {whatQuestion(); console.log(question);});
answerLi2.addEventListener("click",(event) => {whatQuestion(); console.log(question);});
answerLi3.addEventListener("click",(event) => {whatQuestion(); console.log(question);});
answerLi4.addEventListener("click",(event) => {whatQuestion(); console.log(question);});

startButton.addEventListener("click",() => {whatQuestion();});
initialSubmit.addEventListener("click", (event) => {whatQuestion(); console.log(question)});
goBack.addEventListener("click", (event) => {whatQuestion(); console.log(question)})

let timeLeft;
let timeInterval;

function countdown(){
    timeLeft = 100;

    let timeInterval = setInterval(function () {
    
    if (question === 7){
        //end of quiz reached
        timerEl.textContent = '';
        clearInterval(timeInterval);

    }else if(timeLeft > 1) {
        timerEl.textContent ='Time: ' + timeLeft;
        timeLeft--;

    } else {
        //run out of time
        timerEl.textContent = '';
        clearInterval(timeInterval);
    }
}, 1000);}

function whatQuestion(){
    // console.log(event.path[0]);
    if(event.path[0].getAttribute("data-eval") === "true"){
        lineBreak.setAttribute("style","display: block;")
        answerEval.textContent = ("Correct!");
    }else if(event.path[0].getAttribute("data-eval") === "false"){
        lineBreak.setAttribute("style","display: block;")
        answerEval.textContent = ("Wrong!")
        timeLeft = timeLeft - 10;
        timerEl.textContent = timeLeft + ' second remaining';
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
    }else{
        mainMenu();
    }
}

function mainMenu(){
    headerEl.setAttribute("style","display: block;");
    questionDiv.setAttribute("style","display: none;");
    scoreDiv.setAttribute("style","display: none");
    question = 1;
}

function firstQuestion(){

    

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
}

function enterInitials(){

    lineBreak.setAttribute("style","display: none;");
    answerEval.setAttribute("style","display: none;");

    questionEl.textContent = "All Done!";
    finalScore.textContent = "your final score is " + timeLeft;
    finalScore.setAttribute("style","display: block");

    questionOl.setAttribute("style","display: none;")
    initialDiv.setAttribute("style","display: block");


    question++;
}

function highScores(){
    questionEl.textContent = "High scores"
    finalScore.setAttribute("style","display: none");
    initialDiv.setAttribute("style","display: none");

    scoreDiv.setAttribute("style","display: block");
    question = 0;
}

// function questionLogic(){
//     console.log(event.target);
//     lineBreak.setAttribute("style","display: block;")
//     if(this.getAttribute("data-eval") === "true"){
//         answerEval.textContent = ("Correct!");
//     }else{
//         answerEval.textContent = ("Wrong!")
//     }

// }