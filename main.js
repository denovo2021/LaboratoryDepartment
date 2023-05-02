document.addEventListener("DOMContentLoaded", () => {
  const amLink = document.getElementById("am-link");
  const pmLink = document.getElementById("pm-link");
  const questionSection = document.querySelector(".question-section");

  questionSection.style.display = "none";

  amLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadQuestions("068/" + e.target.dataset.set);
  });

  pmLink.addEventListener("click", (e) => {
    e.preventDefault();
    loadQuestions("068/" + e.target.dataset.set);
  });

  async function loadQuestions(filename) {
    try {
      const response = await fetch(filename + ".json");
      const questions = await response.json();
      const answerResponse = await fetch("068/ans_068.json");
      const answers = await answerResponse.json();
      displayQuestion(questions, answers, filename);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

  function displayQuestion(questions, answers, filename) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");

    questionSection.style.display = "block";
    questionText.textContent = question.text;
    choicesList.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.dataset.choice = index + 1;
      li.addEventListener("click", (e) => {
        showResult(question.number, e.target.dataset.choice, answers, filename);
      });
      choicesList.appendChild(li);
    });
  }

  function showResult(questionNumber, selectedChoice, answers, filename) {
    const result = document.getElementById("result");
    const prefix = filename === "068/question_068_01" ? "A" : "B";
    const correctAnswer = answers[prefix + questionNumber];

    if (parseInt(selectedChoice) === correctAnswer) {
      result.textContent = "正解！";
      result.style.color = "green";
    } else {
      result.textContent = "不正解。正解は " + correctAnswer + " です。";
      result.style.color = "red";
    }
  }
});
