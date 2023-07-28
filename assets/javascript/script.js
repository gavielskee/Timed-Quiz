// Getting the necessary elements from the DOM
const startScreen = document.getElementById('start-screen');
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answers'); 
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start-button');
const quizContainer = document.querySelector('#quiz-container');
const scoreContainer = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');

const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript',
        answers: [
            { text: '<javascript>', correct: false},
            { text: '<scripting>', correct: false},
            { text: '<js>', correct: false},
            { text: '<script>', correct: true},
        ]
    },
    {
        question: 'Choose the correct HTML element for the largest heading:',
        answers: [
            { text: '<h6>', correct: false},
            { text: '<heading>', correct: false},
            { text: '<head>', correct: false},
            { text: '<h1>', correct: true},
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true},
            { text: 'Computer Style Sheets', correct: false},
            { text: 'Colorful Style Sheets', correct: false},
            { text: 'Creative Style Sheets', correct: false},
        ]
    },
    {
        question: 'Which CSS property controls the text size?',
        answers: [
            { text: 'text-size', correct: false},
            { text: 'font-style', correct: false},
            { text: 'font-size', correct: true},
            { text: 'text-style', correct: false},
        ]  
    }
];


let timeEl = document.getElementById('time-element');
let currentTime = 100;

// Event listener for startTimer
startButton.addEventListener('click', startQuiz);

let currentQuestionIndex = 0;
let score = 0;

function showStartPage(){
  startScreen.style.display = 'block';
  quizContainer.style.display = 'none';
};

//Function to start quiz
function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  startScreen.style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion();
  startTimer();
};

function showQuestion() {
  currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  scoreContainer.innerText = score;

// Clear previous answers
  answerButton.innerHTML = ''; 

//   Create and display answer buttons
    currentQuestion.answers.forEach(answers => {
    const button = document.createElement('button');
    button.textContent = answers.text;
    button.addEventListener('click', () => handleAnswerClick(answers.correct));
    answerButton.appendChild(button);
  });
}

// Function to handle the user's answer click
function handleAnswerClick(isCorrect) {
  if (isCorrect) {
    // Increment score for correct answer
    score++;
    console.log(score);
  }

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    // If there are no more questions, end the quiz
    endQuiz();
  }
}

// Starts timer when pressing the button
function startTimer() {
  let timeInterval = setInterval(function () {
    if (currentTime === 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
    timeEl.textContent = currentTime;
    currentTime--;
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Hide the quiz container
  quizContainer.style.display = 'none';

  // Display the user's score or any other end-of-quiz actions
  gameOverScreen.innerText=`Your score: ${score} out of ${questions.length}`;
}

// Show the start page initially
showStartPage();


