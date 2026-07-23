const objectMeanings = {
  typewriter: {
    label: "Typewriter",
    title: "Her job",
    text: "Macabea works as a typist, but her job does not give her power or comfort. The typewriter represents survival, routine, and the way society only sees her as useful when she is quiet."
  },
  radio: {
    label: "Radio",
    title: "Curiosity",
    text: "The radio represents Macabea's curiosity. She listens to facts and programs because she wants to understand a world that rarely stops to understand her."
  },
  mirror: {
    label: "Mirror",
    title: "Identity",
    text: "The mirror represents identity. When Macabea looks at herself, the novel asks who she is, who notices her, and why her existence is treated as almost invisible."
  },
  cocacola: {
    label: "Coca-Cola",
    title: "Small happiness",
    text: "Coca-Cola represents one of Macabea's small pleasures. It is simple, modern, and ordinary, but for her it becomes a tiny symbol of happiness."
  },
  star: {
    label: "Star",
    title: "Hope",
    text: "The star represents hope. Macabea is not famous or powerful, but the title reminds us that even an ignored person can have an hour of light."
  }
};

const quizQuestions = [
  {
    question: "What does the typewriter represent in this project?",
    answers: ["Her job and survival", "A sports trophy", "A family vacation", "A magic power"],
    correct: 0
  },
  {
    question: "Why is the radio important for Macabea?",
    answers: ["It shows her curiosity", "It makes her rich", "It proves she is a singer", "It replaces the narrator"],
    correct: 0
  },
  {
    question: "What does the mirror mainly connect to?",
    answers: ["Identity", "Weather", "Technology", "The World Cup final"],
    correct: 0
  },
  {
    question: "In the project, Coca-Cola symbolizes...",
    answers: ["A small happiness", "A dangerous secret", "A school subject", "A political speech"],
    correct: 0
  },
  {
    question: "Why is Macabea called a hidden star?",
    answers: ["Because her life matters even when society ignores her", "Because she is a famous football player", "Because she owns a stadium", "Because she refuses to live in Brazil"],
    correct: 0
  }
];

const objectButtons = document.querySelectorAll(".object-card");
const objectDetails = document.querySelectorAll(".object-detail");
const questionCounter = document.querySelector("#questionCounter");
const scoreBadge = document.querySelector("#scoreBadge");
const quizQuestion = document.querySelector("#quizQuestion");
const answersContainer = document.querySelector("#answers");
const quizFeedback = document.querySelector("#quizFeedback");
const nextQuestion = document.querySelector("#nextQuestion");

let currentQuestion = 0;
let score = 0;
let answered = false;

objectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedObject = button.dataset.object;

    objectButtons.forEach((item) => item.classList.remove("active"));
    objectDetails.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-detail="${selectedObject}"]`)?.classList.add("active");
  });
});

function renderQuestion() {
  if (!quizQuestion || !answersContainer || !questionCounter || !scoreBadge || !nextQuestion) {
    return;
  }

  const item = quizQuestions[currentQuestion];
  answered = false;
  quizQuestion.textContent = item.question;
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  scoreBadge.textContent = `Score: ${score}`;
  quizFeedback.textContent = "";
  nextQuestion.textContent = currentQuestion === quizQuestions.length - 1 ? "See Final Score" : "Next Question";
  nextQuestion.disabled = true;
  answersContainer.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(button, index));
    answersContainer.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedIndex) {
  if (answered) return;

  const item = quizQuestions[currentQuestion];
  const answerButtons = document.querySelectorAll(".answer-button");
  answered = true;
  nextQuestion.disabled = false;

  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) {
      button.classList.add("correct");
    }
  });

  if (selectedIndex === item.correct) {
    score += 1;
    selectedButton.classList.add("correct");
    quizFeedback.textContent = "Correct! You found Macabea's hidden meaning.";
  } else {
    selectedButton.classList.add("wrong");
    quizFeedback.textContent = "Not quite. Look at the highlighted correct answer.";
  }

  scoreBadge.textContent = `Score: ${score}`;
}

if (nextQuestion) {
  nextQuestion.addEventListener("click", () => {
    if (currentQuestion < quizQuestions.length - 1) {
      currentQuestion += 1;
      renderQuestion();
      return;
    }

    quizQuestion.textContent = "Final Score";
    questionCounter.textContent = "Quiz completed";
    scoreBadge.textContent = `Score: ${score}/${quizQuestions.length}`;
    answersContainer.innerHTML = "";
    quizFeedback.textContent = score >= 4
      ? "Excellent! You are ready to explain the project to the judges."
      : "Good try! Visit the locker room again and connect each object to Macabea.";
    nextQuestion.textContent = "Restart Quiz";
    nextQuestion.disabled = false;
    currentQuestion = -1;
    score = 0;
  });
}

renderQuestion();

const participationForm = document.querySelector("#participationForm");
const participationCount = document.querySelector("#participationCount");
const participationList = document.querySelector("#participationList");
const participationMessage = document.querySelector("#participationMessage");
const downloadParticipation = document.querySelector("#downloadParticipation");
const clearParticipation = document.querySelector("#clearParticipation");
const participationKey = "macabeaParticipationRecords";

function getParticipationRecords() {
  try {
    return JSON.parse(localStorage.getItem(participationKey)) || [];
  } catch (error) {
    return [];
  }
}

function saveParticipationRecords(records) {
  localStorage.setItem(participationKey, JSON.stringify(records));
}

function renderParticipationRecords() {
  if (!participationCount || !participationList) {
    return;
  }

  const records = getParticipationRecords();
  participationCount.textContent = records.length;

  if (records.length === 0) {
    participationList.innerHTML = '<p class="empty-state">No participants have been registered yet.</p>';
    return;
  }

  participationList.innerHTML = "";

  records.forEach((record, index) => {
    const card = document.createElement("article");
    const heading = document.createElement("div");
    const name = document.createElement("strong");
    const meta = document.createElement("span");
    const feedback = document.createElement("p");

    card.className = "participant-card";
    name.textContent = `${index + 1}. ${record.name}`;
    meta.textContent = `${record.role} - ${record.date}`;
    feedback.textContent = record.feedback;

    heading.append(name, meta);
    card.append(heading, feedback);
    participationList.appendChild(card);
  });
}

function escapeCsv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

if (participationForm) {
  participationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(participationForm);
    const records = getParticipationRecords();
    const newRecord = {
      name: formData.get("participantName").trim(),
      role: formData.get("participantRole"),
      feedback: formData.get("participantFeedback").trim(),
      date: new Date().toLocaleString("en-US")
    };

    records.push(newRecord);
    saveParticipationRecords(records);
    participationForm.reset();
    renderParticipationRecords();

    if (participationMessage) {
      participationMessage.textContent = "Participation registered successfully.";
    }
  });
}

if (downloadParticipation) {
  downloadParticipation.addEventListener("click", () => {
    const records = getParticipationRecords();
    const header = ["Name", "Role", "Comment", "Date"];
    const rows = records.map((record) => [
      record.name,
      record.role,
      record.feedback,
      record.date
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "macabea-participation.csv";
    link.click();
    URL.revokeObjectURL(url);
  });
}

if (clearParticipation) {
  clearParticipation.addEventListener("click", () => {
    saveParticipationRecords([]);
    renderParticipationRecords();

    if (participationMessage) {
      participationMessage.textContent = "The participation list was cleared.";
    }
  });
}

renderParticipationRecords();
