const questionEl = document.querySelector(".question-text");
const optionsEl = document.querySelector(".options");
const questionsContainer = document.querySelector(".questionsContainer");
const answerContainer = document.querySelector(".answersContainer");
const ansBtn = answerContainer.querySelectorAll("button");
const questionNum = document.querySelector(".question-number");

let testQuestions = [];

let question = 0;
let currentQuestion = 0;

//Select question from object
let curQuestion;

//Add text content

//Loop through options for answer buttons

function btnCreate() {
  curQuestion.options.forEach((option) => {
    let btn = document.createElement("button");
    btn.classList.add("options");
    btn.textContent = option;
    if (question < 10) {
      questionNum.textContent = `Question ${question + 1} / 10`;
    }
    answerContainer.append(btn);
  });
}

//SetTimeOut Function

function setTimeOut() {
  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion >= testQuestions.length) {
      // Quiz complete, no more questions
      answerContainer.textContent = "";
      questionsContainer.textContent = "";
      questionsContainer.classList.remove("questionsContainer");
      questionsContainer.classList.add("quizComplete");

      return; // stop here
    }

    curQuestion = testQuestions[currentQuestion];
    questionEl.textContent = curQuestion.question;
    answerContainer.textContent = "";
    btnCreate();
    clickLock = false;
  }, 500);
}

//Click function for correct and wrong answer
let clickLock = false;

answerContainer.addEventListener("click", function (e) {
  if (clickLock) return;

  if (question >= 10) {
    answerContainer.textContent = "";
    questionsContainer.textContent = "";
    console.log("quiz complete");
    return;
  }

  //Handle click on options
  if (
    e.target.classList.contains("options") &&
    e.target.textContent === curQuestion.answer
  ) {
    e.target.classList.add("correct-answer");
    clickLock = true;
    question++;
    setTimeOut(); //SetTimeOut function called
  } else if (
    e.target.classList.contains("options") &&
    e.target.textContent !== curQuestion.answer
  ) {
    e.target.classList.add("wrong-answer");
    clickLock = true;
    question++;
    setTimeOut(); //SetTimeOut function called
  }
});

function shuffleArray(arr) {
  // Simple Fisher-Yates shuffle
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

const quizApi = fetch(
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
);

quizApi
  .then((response) => {
    console.log("Raw Response object:", response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
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
