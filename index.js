const questionEl = document.querySelector(".question-text");
const optionsEl = document.querySelector(".options");
const questionsContainer = document.querySelector(".questionsContainer");
const answerContainer = document.querySelector(".answersContainer");
const ansBtn = answerContainer.querySelectorAll("button");
const questionNum = document.querySelector(".question-number");

let testQuestions = [];
let correctAnswers = [];

let currentQuestion = 0;

//Select question from object
let curQuestion;

//Clicklock flag
let clickLock = false;

//Button create function
function btnCreate() {
  answerContainer.textContent = "";
  curQuestion.options.forEach((option) => {
    let btn = document.createElement("button");
    btn.classList.add("options");
    btn.textContent = option;
    answerContainer.append(btn);
    questionDisplay();
  });
}

//Display question number Function
function questionDisplay() {
  if (currentQuestion < 10) {
    questionNum.textContent = `Question ${currentQuestion + 1} / 10`;
  }
}

//Next question Function
function nextQuestion() {
  setTimeout(() => {
    curQuestion = testQuestions[currentQuestion];
    answerContainer.textContent = "";
    questionEl.textContent = curQuestion.question;
    btnCreate();
    clickLock = false;
  }, 2000);
}

//Display answer Function
function displayAnswer(e) {
  if (clickLock) return;

  if (
    e.target.classList.contains("options") &&
    e.target.textContent === curQuestion.answer
  ) {
    // Correct answer
    e.target.classList.add("correct-answer");
    correctAnswers.push(curQuestion.answer);
    clickLock = true;
    currentQuestion++;
  } else if (
    e.target.classList.contains("options") &&
    e.target.textContent !== curQuestion.answer
  ) {
    // Wrong answer
    e.target.classList.add("wrong-answer");

    const curBtn = document.querySelectorAll("button.options");
    curBtn.forEach((btn) => {
      if (btn.textContent === curQuestion.answer) {
        btn.classList.add("correct-answer");
      }
    });

    clickLock = true;
    currentQuestion++;
  } else {
    return;
  }
}

//Quiz complete function
function quizCompleteCheck() {
  // Check if quiz is complete
  if (currentQuestion >= testQuestions.length) {
    setTimeout(() => {
      questionEl.textContent = `Your Total score is ${correctAnswers.length} / 10`;
      answerContainer.textContent = "";
      questionsContainer.classList.remove("questionsContainer");
      questionsContainer.classList.add("quizComplete");
      restartQuiz();
    }, 1200);
    return;
  }
}

//Restart quiz Function

function restartQuiz() {
  //Restart Quiz
  const startAgainBtn = document.createElement("button");
  startAgainBtn.textContent = "Restart";
  startAgainBtn.classList.add("restart-button");
  answerContainer.append(startAgainBtn);
  startAgainBtn.addEventListener("click", function () {
    location.reload(); // restart logic
  });
}

// Simple Fisher-Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

//Decode &quot;, &#39;, &amp;

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

answerContainer.addEventListener("click", function (e) {
  displayAnswer(e);
  //check if quiz is complete
  quizCompleteCheck();
  // Otherwise go to next question
  if (currentQuestion < testQuestions.length) {
    nextQuestion();
  }
});

//Quiz API fetch function

const quizApi = fetch(
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
);

quizApi
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    testQuestions = data.results.map((q) => ({
      question: decodeHtml(q.question),
      answer: decodeHtml(q.correct_answer),
      options: shuffleArray([
        decodeHtml(q.correct_answer),
        ...q.incorrect_answers.map(decodeHtml),
      ]),
    }));
    curQuestion = testQuestions[currentQuestion];
    questionEl.textContent = curQuestion.question;
    btnCreate(); //Create initial buttons
  });
