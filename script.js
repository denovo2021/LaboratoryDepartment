// 問題データと解答データのサンプル
const questions = [
  {
    text: '問題1: 医療情報システムで臨床検査項目分類コードとして用いられるのはどれか。',
    choices: ['1. DICOM', '2. HL7', '3. ICD11', '4. JLAC', '5. PACS'],
    correctAnswer: 4,
  },
  {
    text: '問題2: 波長220nmの光の分類はどれか。',
    choices: ['1. 紫外線A', '2. 紫外線B', '3. 紫外線C', '4. 赤外線A', '5. 赤外線B'],
    correctAnswer: 3,
  },
  // 他の問題を追加
];

let currentQuestionIndex = 0;
let userAnswer = null;

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').innerText = question.text;
  const choices = document.querySelectorAll('.choice');
  for (let i = 0; i < choices.length; i++) {
    choices[i].innerText = question.choices[i];
  }
}

document.querySelectorAll('.choice').forEach((choice) => {
  choice.addEventListener('click', (e) => {
    userAnswer = parseInt(e.target.dataset.choice);
  });
});

document.getElementById('submit-answer').addEventListener('click', () => {
  const resultText = document.getElementById('result-text');
  if (userAnswer === questions[currentQuestionIndex].correctAnswer) {
    resultText.innerText = '正解！';
  } else {
    resultText.innerText = '不正解...';
  }
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
});

document.getElementById('next-question').addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
  } else {
    alert('すべての問題が終了しました！');
  }
});

displayQuestion();
