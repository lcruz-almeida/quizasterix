const quiz = [
  {
    question: "Quem é a rainha do Egito nesta história?",
    answers: ["Nefertiti", "Cleópatra", "Isis", "Hatshepsut"],
    correct: 1
  },
  {
    question: "Quem desafia Cleópatra?",
    answers: ["Astérix", "Panoramix", "Júlio César", "Obélix"],
    correct: 2
  },
  {
    question: "Qual é o objetivo da aposta?",
    answers: [
      "Construir um palácio em 3 meses",
      "Conquistar Roma",
      "Criar uma poção mágica",
      "Viajar até à Gália"
    ],
    correct: 0
  },
  {
    question: "Quem é o arquiteto escolhido?",
    answers: ["Amonbofis", "Numérobis", "Panoramix", "Obélix"],
    correct: 1
  },
  {
    question: "Quem ajuda Numérobis?",
    answers: ["Romanos", "Astérix e Obélix", "Piratas", "Druidas"],
    correct: 1
  },
  {
    question: "Quem tenta sabotar o projeto?",
    answers: ["Panoramix", "Amonbofis", "Astérix", "Obélix"],
    correct: 1
  },
  {
    question: "Qual é a profissão de Panoramix?",
    answers: ["Soldado", "Druida", "Rei", "Arquiteto"],
    correct: 1
  },
  {
    question: "Que ingrediente especial ajuda na construção?",
    answers: ["Água do Nilo", "Poção mágica", "Areia dourada", "Mel"],
    correct: 1
  },
  {
    question: "Em que país se passa a história?",
    answers: ["Grécia", "Roma", "Egito", "Gália"],
    correct: 2
  },
  {
    question: "Quem são os autores da BD?",
    answers: [
      "Hergé",
      "Goscinny e Uderzo",
      "Stan Lee",
      "Tolkien"
    ],
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
  document.getElementById("question").innerText = "Fim do Quiz!";
  document.getElementById("answers").innerHTML = "";
  document.getElementById("score").innerText =
    "Pontuação: " + score + " / " + quiz.length;

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
