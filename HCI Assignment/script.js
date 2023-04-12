const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 30; 
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;


function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}

function startQuiz() {

nameField.disabled=true
idField.textContent =`Id:${idField.value}`
idField.disabled=true
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}


function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "YOUR GRADE  " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}



function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}


function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [ {    question: 'Smoke  in air is a solid in gas?',    answers: [      { text: 'true', correct: true },      { text: 'false', correct: false }    ]
},
{
  question: 'Which is a vegetable?',
  answers: [
      { text: 'Tomato', correct: true },
      { text: 'Carrot', correct: true },
      { text: 'Mango', correct: false },
      { text: 'Orange', correct: true }
  ]
},
{
  question: 'Are Inks chemical based products?',
  answers: [
    { text: 'Yes', correct: true },
    { text: 'No', correct: false }
   
  ]
},
{

  question: 'Riddle. Which Object kisses his/her mom before dying?',
  answers: [
      { text: 'School fees', correct: false },
      { text: 'Book', correct: false },
      { text: 'Bottle', correct: false },
      { text: 'Matches', correct: true }
  ]
},
{
question: 'What is the carbon percentage of humans?',
answers: [
    { text: '20%', correct: true },
    { text: '90%', correct: false },
    { text: '45%', correct: false },
    { text: 'None of the Above', correct: false }
]
},
{
question: 'Is AI the future?',
answers: [
  {text: 'ANY ANSWER IS CORRECT: IT IS A SURVEY BONUS'},
  { text: 'Yes.', correct: true },
  { text: 'No', correct: true }
]
},
{
question: 'Why is the Antartic always cold?',
answers: [
  { text: 'It is scloser to venus than we think', correct: false },
  { text: 'It is 20% made of artificial deep freezer', correct: false },
  { text: 'The latency of the trigonomous cold act as a polynomial difference which takes place at the concentrating converging point', correct: false },
  { text: 'It is just positioned away from the sun', correct: true }
]
},
{
question: 'Which of these shapes are 3 sided?',
answers: [
  { text: 'Box', correct: false },
  { text: 'Circle', correct: false },
  { text: 'triangle', correct: true },
  { text: 'Whatheheckihidron', correct: false }
]
},
{
question: 'Where did the Gas Immigrate from?',
answers: [
  { text: 'Egypt', correct: false },
  { text: 'Keta', correct: false },
  { text: 'Ile Ife', correct: true },
  { text: 'Cameroon', correct: false }
]
},
{
question: 'What is 9+10?',
answers: [
  { text: '21', correct: false },
  { text: '19', correct: true }
]
},
 
];
