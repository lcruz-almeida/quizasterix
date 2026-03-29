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

function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => selectAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (index === quiz[currentQuestion].correct) {
    score++;
  }

  nextQuestion();
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
  document.getElementById("question").innerText = "Fin du quiz !";
  document.getElementById("answers").innerHTML = "";
  document.getElementById("score").innerText =
    "Score : " + score + " / " + quiz.length;

  document.getElementById("restart-btn").style.display = "block";
  document.getElementById("next-btn").style.display = "none";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("restart-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "block";
  document.getElementById("score").innerText = "";
  loadQuestion();
}

loadQuestion();
