const questionEl = document.querySelector(".question-text");
const optionsEl = document.querySelector(".options");
const questionsContainer = document.querySelector(".questionsContainer");
const answerContainer = document.querySelector(".answersContainer");
const ansBtn = answerContainer.querySelectorAll("button");
const questionNum = document.querySelector(".question-number");

const testQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Mark Twain",
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "NaCl"],
    answer: "H2O",
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "C#", "JavaScript", "Assembly"],
    answer: "JavaScript",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "Which gas do plants use in photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1912", "1905", "1898", "1920"],
    answer: "1912",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
];

let question = 0;

let currentQuestion = 0;

//Select question from object
let curQuestion = testQuestions[currentQuestion];

//Add text content
questionEl.textContent = curQuestion.question;

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

btnCreate(); //Create initial buttons

//SetTimeOut Function

function setTimeOut() {
  setTimeout(() => {
    questionNum.textContent = `Question ${question} / 10`;
    currentQuestion++;
    curQuestion = testQuestions[currentQuestion];
    questionEl.textContent = curQuestion.question;
    answerContainer.textContent = "";
    btnCreate();
    clickLock = false;
  }, 1300);
}

//Click function for correct and wrong answer
let clickLock = false;

answerContainer.addEventListener("click", function (e) {
  if (clickLock) return;
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
