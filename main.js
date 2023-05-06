const questionSetA = "068/question_068_01.json";
const questionSetB = "068/question_068_02.json";
const answerSet = "068/ans_068.json";
let questionsA = [];
let questionsB = [];
let answers = {};
let currentQuestion;
let selectedIndices = [];

fetch(questionSetA)
  .then((response) => response.json())
  .then((data) => {
    questionsA = data;
  });

fetch(questionSetB)
  .then((response) => response.json())
  .then((data) => {
    questionsB = data;
  });

fetch(answerSet)
  .then((response) => response.json())
  .then((data) => {
    answers = data;
  });

function loadQuestion() {
  const questionSet = Math.random() < 0.5 ? questionsA : questionsB;
  const question = questionSet[Math.floor(Math.random() * questionSet.length)];
  currentQuestion = question;

  $("#question-text").text(question.text);
  $("#choices").empty();

  question.choices.forEach((choice, index) => {
    const choiceBtn = $("<button>").addClass("btn btn-outline-primary").text(choice);
    choiceBtn.on("click", function() {
      $(this).toggleClass("btn-outline-primary btn-primary");
      toggleChoice(index);
    });
    $("#choices").append(choiceBtn);
  });
}

function toggleChoice(index) {
  if (selectedIndices.includes(index)) {
    selectedIndices = selectedIndices.filter((i) => i !== index);
  } else {
    selectedIndices.push(index);
  }
}

// checkAnswer function (continuation)
function checkAnswer() {
  const answerKey = currentQuestion.number;
  const answerValue = answers["A" + answerKey];
  const correctAnswer = answerValue.toString().split("").map(Number);

  if (selectedIndices.length === correctAnswer.length &&
      selectedIndices.every((index) => correctAnswer.includes(index + 1))) {
    alert("正解!");
  } else {
    alert("不正解。正解は: " + correctAnswer.join(", "));
  }

  loadQuestion();
}

$("#submit-answer").on("click", function() {
  checkAnswer();
  selectedIndices = [];
});

loadQuestion();
