const levels = [
  {
    name: "Level 1 - Starter",
    description: "Warm-up round: clear clues, forgiving attempts.",
    points: 10,
    maxAttempts: 3,
    questions: [
      {
        clue: "A naturally occurring inorganic solid with a definite chemical composition.",
        answer: "mineral",
        hint: "Starts with m and ends with l.",
      },
      {
        clue: "Rocks formed from cooled molten material.",
        answer: "igneous",
        hint: "Starts with i and has 7 letters.",
      },
      {
        clue: "Small particles that settle at the bottom of water bodies.",
        answer: "sediment",
        hint: "Starts with s and ends with t.",
      },
    ],
  },
  {
    name: "Level 2 - Puzzle",
    description: "Harder clues with fewer retries.",
    points: 15,
    maxAttempts: 2,
    questions: [
      {
        clue: "I am a force that pulls objects toward each other.",
        answer: "gravity",
        hint: "g......y",
      },
      {
        clue: "This 4-letter word reads the same forward and backward.",
        answer: "noon",
        hint: "n..n",
      },
      {
        clue: "Drop me and I crack; smile at me and I smile back.",
        answer: "mirror",
        hint: "m....r",
      },
    ],
  },
  {
    name: "Level 3 - Master",
    description: "Final riddles. Every guess counts.",
    points: 20,
    maxAttempts: 2,
    questions: [
      {
        clue: "If I drink, I die. If I eat, I am fine.",
        answer: "fire",
        hint: "4 letters, common element.",
      },
      {
        clue: "I am so fragile that saying my name can break me.",
        answer: "silence",
        hint: "Starts with s, ends with e.",
      },
      {
        clue: "It runs but never walks, has a mouth but never eats.",
        answer: "river",
        hint: "r...r",
      },
    ],
  },
];

const levelLabel = document.getElementById("levelLabel");
const scoreValue = document.getElementById("scoreValue");
const triesValue = document.getElementById("triesValue");
const levelDescription = document.getElementById("levelDescription");
const clueText = document.getElementById("clueText");
const hintText = document.getElementById("hintText");
const hintBtn = document.getElementById("hintBtn");
const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const levelChips = document.getElementById("levelChips");
const scoreCard = document.getElementById("scoreCard");
const restartBtn = document.getElementById("restartBtn");
const confettiLayer = document.getElementById("confettiLayer");

const levelDialog = document.getElementById("levelDialog");
const levelDialogTitle = document.getElementById("levelDialogTitle");
const levelDialogBody = document.getElementById("levelDialogBody");
const nextLevelBtn = document.getElementById("nextLevelBtn");

const gameDialog = document.getElementById("gameDialog");
const gameDialogBody = document.getElementById("gameDialogBody");
const playAgainBtn = document.getElementById("playAgainBtn");

let currentLevelIndex = 0;
let currentQuestionIndex = 0;
let attemptsLeft = levels[0].maxAttempts;
let score = 0;
let completedQuestions = 0;
let hintShown = false;
let isLocked = false;

const totalQuestions = levels.reduce((sum, level) => sum + level.questions.length, 0);

function shuffleQuestions() {
  for (const level of levels) {
    level.questions.sort(() => Math.random() - 0.5);
  }
}

function resetGame() {
  shuffleQuestions();
  currentLevelIndex = 0;
  currentQuestionIndex = 0;
  attemptsLeft = levels[0].maxAttempts;
  score = 0;
  completedQuestions = 0;
  hintShown = false;
  isLocked = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  if (levelDialog.open) levelDialog.close();
  if (gameDialog.open) gameDialog.close();
  updateUI();
  answerInput.focus();
}

function getCurrentLevel() {
  return levels[currentLevelIndex];
}

function getCurrentQuestion() {
  return getCurrentLevel().questions[currentQuestionIndex];
}

function renderChips() {
  levelChips.innerHTML = "";
  levels.forEach((level, index) => {
    const chip = document.createElement("span");
    chip.classList.add("chip");
    chip.textContent = level.name;
    if (index < currentLevelIndex) chip.classList.add("complete");
    if (index === currentLevelIndex) chip.classList.add("current");
    if (index > currentLevelIndex) chip.classList.add("upcoming");
    levelChips.appendChild(chip);
  });
}

function setFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
}

function updateProgress() {
  const ratio = Math.round((completedQuestions / totalQuestions) * 100);
  progressFill.style.width = `${ratio}%`;
  progressText.textContent = `${ratio}%`;
}

function updateUI() {
  const level = getCurrentLevel();
  const question = getCurrentQuestion();
  levelLabel.textContent = level.name;
  scoreValue.textContent = String(score);
  triesValue.textContent = String(attemptsLeft);
  levelDescription.textContent = level.description;
  clueText.textContent = question.clue;
  hintText.textContent = `Hint: ${question.hint}`;
  hintText.classList.toggle("hidden", !hintShown);
  hintBtn.textContent = hintShown ? "Hide Hint" : "Show Hint";
  answerInput.value = "";
  answerInput.disabled = isLocked;
  hintBtn.disabled = isLocked;
  updateProgress();
  renderChips();
}

function lockInput(locked) {
  isLocked = locked;
  answerInput.disabled = locked;
  hintBtn.disabled = locked;
}

function popScore() {
  scoreCard.classList.remove("score-pop");
  void scoreCard.offsetWidth;
  scoreCard.classList.add("score-pop");
}

function launchConfetti(count = 95) {
  const colors = ["#0f766e", "#14b8a6", "#f97316", "#fb923c", "#10b981", "#f59e0b"];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    const size = Math.floor(Math.random() * 6) + 6;
    const left = Math.random() * 100;
    const duration = 1200 + Math.random() * 1300;
    const delay = Math.random() * 240;
    piece.className = "confetti";
    piece.style.left = `${left}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${Math.floor(size * 1.65)}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${duration}ms`;
    piece.style.animationDelay = `${delay}ms`;
    confettiLayer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, duration + delay + 40);
  }
}

function moveToNextQuestion() {
  const level = getCurrentLevel();

  completedQuestions += 1;
  currentQuestionIndex += 1;
  hintShown = false;

  if (currentQuestionIndex < level.questions.length) {
    attemptsLeft = level.maxAttempts;
    lockInput(false);
    updateUI();
    answerInput.focus();
    return;
  }

  if (currentLevelIndex < levels.length - 1) {
    levelDialogTitle.textContent = `${level.name} Cleared!`;
    levelDialogBody.textContent = `Great run. Your score is ${score}. Ready for the next level?`;
    if (!levelDialog.open) levelDialog.showModal();
    return;
  }

  gameDialogBody.textContent = `Champion score: ${score}. You solved every level in Word Quest.`;
  if (!gameDialog.open) gameDialog.showModal();
}

function handleCorrectAnswer() {
  const level = getCurrentLevel();
  lockInput(true);
  score += level.points;
  scoreValue.textContent = String(score);
  popScore();
  setFeedback(`Correct! +${level.points} points.`, "success");
  launchConfetti(65);
  setTimeout(moveToNextQuestion, 700);
}

function handleWrongAnswer(correctAnswer) {
  lockInput(false);
  attemptsLeft -= 1;
  score = Math.max(0, score - 2);
  scoreValue.textContent = String(score);
  triesValue.textContent = String(attemptsLeft);

  if (attemptsLeft <= 0) {
    lockInput(true);
    setFeedback(`Out of tries. Answer: ${correctAnswer}.`, "error");
    setTimeout(moveToNextQuestion, 950);
    return;
  }

  setFeedback(`Not quite. Try again. ${attemptsLeft} tries left.`, "error");
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isLocked) return;
  const guess = answerInput.value.trim().toLowerCase();
  if (!guess) return;

  const correctAnswer = getCurrentQuestion().answer;
  if (guess === correctAnswer) {
    handleCorrectAnswer();
    return;
  }

  handleWrongAnswer(correctAnswer);
});

hintBtn.addEventListener("click", () => {
  hintShown = !hintShown;
  hintText.classList.toggle("hidden", !hintShown);
  hintBtn.textContent = hintShown ? "Hide Hint" : "Show Hint";
});

nextLevelBtn.addEventListener("click", () => {
  if (levelDialog.open) levelDialog.close();
  currentLevelIndex += 1;
  currentQuestionIndex = 0;
  attemptsLeft = levels[currentLevelIndex].maxAttempts;
  hintShown = false;
  lockInput(false);
  updateUI();
  answerInput.focus();
});

playAgainBtn.addEventListener("click", () => {
  if (gameDialog.open) gameDialog.close();
  resetGame();
});

restartBtn.addEventListener("click", resetGame);

resetGame();
