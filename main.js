const questionSetA = "068/question_068_01.json";
const questionSetB = "068/question_068_02.json";
const answerSet = "068/ans_068.json";

let questionsA = [];
let questionsB = [];
let answers = {};

let currentQuestion = null;
let selectedIndices = [];

function getRandomQuestion() {
  const questionSet = Math.random() < 0.5 ? questionsA : questionsB;
  return questionSet[Math.floor(Math.random() * questionSet.length)];
}

function loadQuestion() {
  currentQuestion = getRandomQuestion();
  $("#question-text").text(currentQuestion.text);
  $("#choices").empty();

  currentQuestion.choices.forEach((choice, index) => {
    const choiceElement = $("<button>")
      .addClass("choice")
      .text(choice)
      .on("click", function () {
        const selectedIndex = selectedIndices.indexOf(index);

        if (selectedIndex === -1) {
          selectedIndices.push(index);
          $(this).addClass("selected");
        } else {
          selectedIndices.splice(selectedIndex, 1);
          $(this).removeClass("selected");
        }
      });

    $("#choices").append(choiceElement);
  });
}

function checkAnswer() {
  const answerKey = currentQuestion.number;
  const answerValue = answers["A" + answerKey];
  const correctAnswer = answerValue.toString().split("").map(Number);

  if (
    selectedIndices.length === correctAnswer.length &&
    selectedIndices.every((index) => correctAnswer.includes(index + 1))
  ) {
    alert("正解!");
  } else {
    alert("不正解。正解は: " + correctAnswer.join(", "));
  }

  loadQuestion();
}

$("#submit-answer").on("click", function () {
  checkAnswer();
  selectedIndices = [];
});

Promise.all([
  fetch(questionSetA)
    .then((response) => response.json())
    .then((data) => {
      questionsA = data;
    }),
  fetch(questionSetB)
    .then((response) => response.json())
    .then((data) => {
      questionsB = data;
    }),
  fetch(answerSet)
    .then((response) => response.json())
    .then((data) => {
      answers = data;
    }),
]).then(() => {
  loadQuestion();
});
