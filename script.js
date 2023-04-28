const questions = [
  // ここに質問データを追加
];

const answers = [
  // ここに解答データを追加
];

function createQuestionElement(question, index) {
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");

  const questionTitle = document.createElement("h3");
  questionTitle.textContent = `問${index + 1}: ${question.title}`;
  questionElement.appendChild(questionTitle);

  question.choices.forEach((choice, i) => {
    const choiceElement = document.createElement("div");
    choiceElement.classList.add("choice");
    choiceElement.textContent = `${i + 1}. ${choice}`;

    choiceElement.addEventListener("click", (event) => {
      handleChoiceClick(event, index);
    });

    questionElement.appendChild(choiceElement);
  });

  return questionElement;
}

function handleChoiceClick(event, questionIndex) {
  const selectedChoices = document.querySelectorAll(".choice.selected");
  selectedChoices.forEach((choice) => {
    choice.classList.remove("selected");
  });

  event.target.classList.add("selected");
  showAnswer(questionIndex, event.target.textContent.charAt(0));
}

function showAnswer(questionIndex, userChoice) {
  const answer = answers[questionIndex];
  const message = userChoice == answer ? "正解です！" : `不正解。正解は${answer}です。`;
  alert(message);
}

function renderQuestions() {
  const container = document.getElementById("questions-container");

  questions.forEach((question, index) => {
    const questionElement = createQuestionElement(question, index);
    container.appendChild(questionElement);
  });
}

renderQuestions();
