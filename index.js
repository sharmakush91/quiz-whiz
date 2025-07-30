const testQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is 10 + 15?",
    options: ["20", "25", "30", "35"],
    answer: "25",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Mark Twain",
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    answer: "Carbon Dioxide",
  },
];

const questionEl = document.querySelector(".question-text");
const optionsEl = document.querySelector(".options");
const questionsContainer = document.querySelector(".questionsContainer");
const answerContainer = document.querySelector(".answersContainer");

let currentQuestion = Math.floor(Math.random() * testQuestions.length);

let curQuestion = testQuestions[currentQuestion];

questionEl.textContent = curQuestion.question;

curQuestion.options.forEach((option) => {
  const btn = document.createElement("button");
  btn.classList.add("options");
  btn.textContent = option;

  answerContainer.append(btn);
});
