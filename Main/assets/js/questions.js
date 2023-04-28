// list of all questions, choices, and answers
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quizContainer');
const questionEl = document.getElementById('question-container');
const questionTitle = document.getElementById('question-title');
const correctAudio = document.getElementById('correct-audio');
const incorrectAudio = document.getElementById('incorrect-audio');
const answerContainer = document.querySelector(".answer-container");
const gameOverContainer = document.getElementById('game-over-container');
const getResults = document.getElementById('results');


let time = 100;
let timerInterval;
let results = [];


if (localStorage.getItem("highscores")){

  results = JSON.parse(localStorage.getItem("highscores"));
  console.log(JSON.parse(localStorage.getItem("highscores")));
}



function startTimer() {
  showQuestion();
  timerInterval = setInterval(function () {
    time--;
    document.getElementById('timer').style.display
    document.getElementById('timer').textContent = "Time: " + time;
    if (time <= 0) {
      clearInterval(timerInterval);
    }

  }, 1000); // 1000 milliseconds = 1 second
}

function showHighScorePrompt() {
  //localStorage.setItem("time", time); // store time in local storage
  console.log(time);

  // prompt user for initials and save high score
  let initials = prompt("Enter your initials to save your high score:");

  var playerdata = {
    initials: initials,
    time: time
  }

  //localStorage.setItem("initials", initials);

  results.push(playerdata);

  // for (let i = 0; i < localStorage.length; i++) {
  //   let key = localStorage.key(i);
  //   let value = localStorage.getItem(key);
  //   console.log(key + ': ' + value);
  // }

  console.log(JSON.stringify(results));

  localStorage.setItem("highscores", JSON.stringify(results));




  console.log(results);
}

function renderHighScore() {
  const highscores = JSON.parse(localStorage.getItem("highscores"));
  console.log(highscores);

  for (let i = 0; i < highscores.length; i++) {
    const el = highscores[i];
    console.log("el.initials", el.initials);
    console.log("el.time", el.time);
    const listEntry = `<li>${el.initials}:${el.time}</li>`
    getResults.appendTo(listEntry);

  }

}

renderHighScore();

// var printSkills = function (name, date) {
//   var listEl = $('<li>');
//   var listDetail = name.concat(' on ', date);
//   listEl.addClass('list-group-item').text(listDetail);
//   listEl.appendTo(skillsListEl);
// };

let currentQuestionIndex = 0;

function showQuestion() {
  if (currentQuestionIndex === 5) {
    showHighScorePrompt();
    //window.location.assign("highscores.html");
  }
  const question = questions[currentQuestionIndex]
  const answers = questions[currentQuestionIndex].choices;


  questionTitle.textContent = question.title
  questionEl.appendChild(questionTitle);



  answerContainer.classList.remove('hide');

  for (let i = 0; i < question.choices.length; i++) {
    let answerEl = question.choices[i];
    const answerButton = document.getElementById("option" + i);
    answerButton.setAttribute("value", answerEl);
    answerButton.textContent = answerEl;
  }
  // Does answer button need to be inbedded in this for loop? //


}

const answersButton = document.querySelectorAll(".option");
console.log(answersButton);


function userAnswerPick(event) {
  const targetElement = event.target.value;
  if (targetElement === questions[currentQuestionIndex].answer && currentQuestionIndex <= 4) {
    const correctDisplay = document.querySelector(".correct");
    console.log(correctDisplay);
    // correctDisplay.setAttribute("class", "reveal")
    // setTimeout(() => {
    //   // After a few seconds, set the class back to the original value
    //   correctDisplay.setAttribute("class", "hide")
    // }, 1300); // 3000 milliseconds = 3 seconds
    currentQuestionIndex++;
    correctAudio.play();
    showQuestion();

  if (currentQuestionIndex === 5 || time <=0) {
      let event = new Event("currentQuestionIndexReachFive");
      document.dispatchEvent(event);
      showHighScorePrompt();
    }

  } else {
    incorrectAudio.play();
    time -= 5;
    // const wrongDisplay = document.querySelector(".wrong");
    // wrongDisplay.setAttribute("class", "reveal")
    // setTimeout(() => {
    //   // After a few seconds, set the class back to the original value
    //   wrongDisplay.setAttribute("class", "hide")
    // }, 1100); //
  }
}
answerContainer.addEventListener('click', userAnswerPick);


// Add click event listener to each answer button
// answersButton.addEventListener('click', function(event) {
//console.log(answerEl);
//console.log(answerButton);
// Check if the selected answer is correct
//if (answerEl === question.answer) {
//     // Move to the next question
//     currentQuestionIndex++;
//     correctAudio.play();
//     showQuestion();
//   } else {
//     // Subtract 5 seconds from the time
//     incorrectAudio.play();
//     time -= 5;
//   }
// });


// Update the question-container element with the question and answers HTML

//console.log(questionHTML + answersHTML)

function startQuiz(event) {
  event.preventDefault();
  // // Hide the start button
  startButton.style.display = 'none';
  // Show the quiz container
  questionEl.style.display = 'block';

  // Show the first question
  showQuestion();
}

document.getElementById('start-button').addEventListener('click', startTimer);
startButton.addEventListener('click', startQuiz);
