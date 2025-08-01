let currentQuestion = 0;
let score = 0;
let questions = [];
let previousScore = localStorage.getItem("quiz_score") || null;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.querySelector(".quiz-container");
const homeScreen = document.getElementById("home-screen");
const pointsScreen = document.getElementById("points-screen");
const lastScoreEl = document.getElementById("last-score");
const previousScoreEl = document.getElementById("previous-score");
const appreciationEl = document.getElementById("appreciation");

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
  });

function startQuiz() {
  homeScreen.classList.add("hidden");
  pointsScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

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
    endQuiz();
  }
};

function endQuiz() {
  quizContainer.classList.add("hidden");
  pointsScreen.classList.remove("hidden");

  lastScoreEl.textContent = `Ton score actuel : ${score}/${questions.length}`;
  if (previousScore !== null) {
    previousScoreEl.textContent = `Score précédent : ${previousScore}/${questions.length}`;
    const diff = score - previousScore;
    if (diff > 0) appreciationEl.textContent = "👏 Bien joué ! Tu t'améliores.";
    else if (diff < 0) appreciationEl.textContent = "📉 Tu feras mieux la prochaine fois.";
    else appreciationEl.textContent = "🔁 Score identique. Essaye un autre thème ?"
  } else {
    previousScoreEl.textContent = "Pas de score précédent enregistré.";
    appreciationEl.textContent = "🎉 Bravo pour ta première tentative !";
  }

  localStorage.setItem("quiz_score", score);
  previousScore = score;
}

function showTab(tab) {
  if (tab === "quiz") {
    homeScreen.classList.remove("hidden");
    quizContainer.classList.add("hidden");
    pointsScreen.classList.add("hidden");
  } else if (tab === "points") {
    quizContainer.classList.add("hidden");
    homeScreen.classList.add("hidden");
    endQuiz();
  }
}