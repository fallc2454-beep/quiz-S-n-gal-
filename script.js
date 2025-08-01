let currentQuestion = 0;
let score = 0;
let questions = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(answer);
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

function selectAnswer(answer) {
  const correct = questions[currentQuestion].correct;
  if (answer === correct) score++;

  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.style.backgroundColor = "#009e60";
    else btn.style.backgroundColor = "#e74c3c";
  });

  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Quiz terminé !";
    answersEl.innerHTML = "";
    nextBtn.classList.add("hidden");
    scoreEl.textContent = `Score : ${score} / ${questions.length}`;
    scoreEl.classList.remove("hidden");
  }
};