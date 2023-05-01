async function loadJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayQuestion(questionData, correctAnswer) {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const correctAnswerElement = document.getElementById("correct-answer");

  questionElement.textContent = questionData.text;

  choicesElement.innerHTML = "";
  questionData.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${choice}`;
    choicesElement.appendChild(li);
  });

  correctAnswerElement.textContent = `正答: ${correctAnswer}`;
}

async function showQuestion(questionSet) {
  const questions = await loadJson(`./068/questions_068_${questionSet}.json`);
  const answers = await loadJson("./068/ans_068.json");
  const questionData = questions[Math.floor(Math.random() * questions.length)];
  const questionNumber = questionData.number;
  const correctAnswerIndex = answers[questionSet === "01" ? "A" : "B"][questionNumber] - 1;
  const correctAnswer = questionData.choices[correctAnswerIndex];
  displayQuestion(questionData, correctAnswer);
}

document.getElementById("link-am").addEventListener("click", (event) => {
  event.preventDefault();
  showQuestion("01");
});

document.getElementById("link-pm").addEventListener("click", (event) => {
  event.preventDefault();
  showQuestion("02");
});
