const quiz = [
  {
    question: "Qui est la reine d'Égypte dans cette histoire ?",
    answers: ["Néfertiti", "Cléopâtre", "Isis", "Hatchepsout"],
    correct: 1
  },
  {
    question: "Qui défie Cléopâtre ?",
    answers: ["Astérix", "Panoramix", "Jules César", "Obélix"],
    correct: 2
  },
  {
    question: "Quel est l'objectif du défi ?",
    answers: [
      "Construire un palais en 3 mois",
      "Conquérir Rome",
      "Créer une potion magique",
      "Voyager en Gaule"
    ],
    correct: 0
  },
  {
    question: "Qui est l'architecte choisi ?",
    answers: ["Amonbofis", "Numérobis", "Panoramix", "Obélix"],
    correct: 1
  },
  {
    question: "Qui aide Numérobis ?",
    answers: ["Les Romains", "Astérix et Obélix", "Les pirates", "Les druides"],
    correct: 1
  },
  {
    question: "Qui tente de saboter le projet ?",
    answers: ["Panoramix", "Amonbofis", "Astérix", "Obélix"],
    correct: 1
  },
  {
    question: "Quelle est la profession de Panoramix ?",
    answers: ["Soldat", "Druide", "Roi", "Architecte"],
    correct: 1
  },
  {
    question: "Quel élément aide à construire plus vite ?",
    answers: ["L'eau du Nil", "La potion magique", "Le sable doré", "Le miel"],
    correct: 1
  },
  {
    question: "Dans quel pays se déroule l'histoire ?",
    answers: ["Grèce", "Rome", "Égypte", "Gaule"],
    correct: 2
  },
  {
    question: "Qui sont les auteurs de la BD ?",
    answers: ["Hergé", "Goscinny et Uderzo", "Stan Lee", "Tolkien"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// 👉 mélange un tableau
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 👉 mélange les réponses ET garde la bonne position
function getShuffledQuestion(q) {
  const answers = q.answers.map((text, index) => ({
    text,
    isCorrect: index === q.correct
  }));

  const shuffled = shuffleArray(answers);

  return {
    question: q.question,
    answers: shuffled
  };
}

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const finalMessageEl = document.getElementById("final-message");

let currentData = null;

function loadQuestion() {
  answered = false;
  nextBtn.style.display = "none";
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  scoreEl.textContent = "";
  finalMessageEl.textContent = "";

  currentData = getShuffledQuestion(quiz[currentQuestion]);

  questionEl.textContent = currentData.question;
  progressEl.textContent = `Question ${currentQuestion + 1} sur ${quiz.length}`;
  answersEl.innerHTML = "";

  currentData.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.className = "answer-btn";
    btn.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    if (currentData.answers[i].isCorrect) {
      btn.classList.add("correct");
    } else if (i === index) {
      btn.classList.add("wrong");
    } else {
      btn.classList.add("neutral");
    }
  });

  if (currentData.answers[index].isCorrect) {
    score++;
    feedbackEl.textContent = "Bonne réponse !";
    feedbackEl.className = "correct";
  } else {
    feedbackEl.textContent = "Mauvaise réponse !";
    feedbackEl.className = "wrong";
  }

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  progressEl.textContent = "";
  questionEl.textContent = "Fin du quiz !";
  answersEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";

  scoreEl.textContent = `Score : ${score} / ${quiz.length}`;

  if (score === quiz.length) {
    finalMessageEl.textContent = "Parfait ! 10/10 !";
    launchConfetti();
  } else if (score >= 7) {
    finalMessageEl.textContent = "Très bon score !";
  } else if (score >= 5) {
    finalMessageEl.textContent = "Pas mal !";
  } else {
    finalMessageEl.textContent = "Tu peux recommencer pour faire mieux.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  restartBtn.style.display = "none";
  loadQuestion();
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#ffd700", "#db281c", "#008435", "#1a171e"];
  const confetti = [];

  for (let i = 0; i < 200; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 3
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(c => {
      c.y += c.speed;
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
    });

    requestAnimationFrame(draw);
  }

  draw();
}

loadQuestion();
