const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");

const question = "次のうち、臨床検査技師の役割に関連するものはどれ？";
const choices = [
    "A. 食品の安全性検査",
    "B. 建築物の耐震性検査",
    "C. 病原体の同定",
    "D. 消防設備の点検",
    "E. 自動車の排ガス検査"
];
const correctAnswer = "C";
const explanation = "臨床検査技師は、患者の診断や治療に必要な検査を行う専門家であり、病原体の同定などがその役割に含まれます。その他の選択肢は、それぞれ異なる専門家が関与する分野であり、臨床検査技師の役割とは直接関係がありません。";

// Set question and choices
questionElement.textContent = question;
choices.forEach((choice) => {
const button = document.createElement("button");
button.textContent = choice;
button.addEventListener("click", () => {
submitButton.disabled = false;
choicesElement.childNodes.forEach((node) => {
node.disabled = true;
});
button.disabled = false;
button.style.backgroundColor = "#ccc";
});
choicesElement.appendChild(button);
});

// Check answer and display result
submitButton.addEventListener("click", () => {
const selectedButton = Array.from(choicesElement.childNodes).find(
(button) => !button.disabled
);
const selectedAnswer = selectedButton.textContent[0];

if (selectedAnswer === correctAnswer) {
resultElement.textContent = "正解！解説: " + explanation;
} else {
resultElement.textContent = "残念、不正解。正解は " + correctAnswer + " です。解説: " + explanation;
}

resultElement.classList.remove("hidden");
submitButton.classList.add("hidden");
});
