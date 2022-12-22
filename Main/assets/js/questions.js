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
let time = 60;
let timerInterval;

function startTimer() {
  showQuestion();
  timerInterval = setInterval(function() {
    time--;
    document.getElementById('timer').style.display
    document.getElementById('timer').textContent = "Time: " + time;
    if (time <= 0){
      clearInterval(timerInterval);
      // Quiz End Input HERE
    }

  }, 1000); // 1000 milliseconds = 1 second
}


let currentQuestionIndex = 0;

function showQuestion() {
  const question = questions[currentQuestionIndex]
  const answers = questions[currentQuestionIndex].choices;

  questionTitle.textContent = question.title
  questionEl.appendChild(questionTitle);


  const answerContainer = document.querySelector(".answer-container");
  answerContainer.classList.remove('hide');

  for (let i=0; i < question.choices.length; i++){
    const answerEl = question.choices[i];
    const answerButton = document.getElementById("option" + i);
    answerButton.textContent = i+1 +". " + answerEl;

   // Add click event listener to each answer button
   answerButton.addEventListener('click', function(event) {
    // Check if the selected answer is correct
    if (answerEl === question.answer) {
      // Move to the next question
      currentQuestionIndex++;
      correctAudio.play();
      showQuestion();
    } else {
      // Subtract 5 seconds from the time
      incorrectAudio.play();
      time -= 5;
    }
  });

}


  // Generate the HTML for the question and answers
//  // questionEl.innerHTML = `<h2>${question}</h2>`;
//   const answersHTML = answers.map(answer => {
//     return `<button>${answer}</button>`;
//   }).join('');
  //console.log(questionHTML)

questionEl.innerHTM


   // Update the question-container element with the question and answers HTML

   //console.log(questionHTML + answersHTML)
}

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
