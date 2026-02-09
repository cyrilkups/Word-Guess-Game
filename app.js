const levels = [
  {
    name: "Level 1 - Starter",
    description: "Warm-up round with clear clues.",
    basePoints: 10,
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
    description: "Sharper clues, less room for mistakes.",
    basePoints: 14,
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
        clue: "Drop me and I crack, smile at me and I smile back.",
        answer: "mirror",
        hint: "m....r",
      },
    ],
  },
  {
    name: "Level 3 - Master",
    description: "Final riddles. Stay calm and move fast.",
    basePoints: 20,
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

const modes = {
  easy: {
    label: "Easy",
    attempts: 3,
    timeLimit: 45,
    lives: 4,
    skips: 3,
    reveals: 3,
    scoreMultiplier: 1,
    wrongPenalty: 1,
  },
  normal: {
    label: "Normal",
    attempts: 2,
    timeLimit: 30,
    lives: 3,
    skips: 2,
    reveals: 2,
    scoreMultiplier: 1.2,
    wrongPenalty: 2,
  },
  hard: {
    label: "Hard",
    attempts: 2,
    timeLimit: 22,
    lives: 2,
    skips: 1,
    reveals: 1,
    scoreMultiplier: 1.45,
    wrongPenalty: 3,
  },
};

const storageKeys = {
  bestScore: "wordQuest.bestScore",
  bestStreak: "wordQuest.bestStreak",
};

const levelLabel = document.getElementById("levelLabel");
const scoreValue = document.getElementById("scoreValue");
const triesValue = document.getElementById("triesValue");
const livesValue = document.getElementById("livesValue");
const streakValue = document.getElementById("streakValue");
const bestScoreValue = document.getElementById("bestScoreValue");
const levelDescription = document.getElementById("levelDescription");
const clueText = document.getElementById("clueText");
const hintText = document.getElementById("hintText");
const assistText = document.getElementById("assistText");
const metaInfo = document.getElementById("metaInfo");
const hintBtn = document.getElementById("hintBtn");
const revealBtn = document.getElementById("revealBtn");
const skipBtn = document.getElementById("skipBtn");
const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const timerText = document.getElementById("timerText");
const timerFill = document.getElementById("timerFill");
const levelChips = document.getElementById("levelChips");
const scoreCard = document.getElementById("scoreCard");
const restartBtn = document.getElementById("restartBtn");
const modeSelect = document.getElementById("modeSelect");
const confettiLayer = document.getElementById("confettiLayer");

const levelDialog = document.getElementById("levelDialog");
const levelDialogTitle = document.getElementById("levelDialogTitle");
const levelDialogBody = document.getElementById("levelDialogBody");
const nextLevelBtn = document.getElementById("nextLevelBtn");

const gameDialog = document.getElementById("gameDialog");
const gameDialogTitle = document.getElementById("gameDialogTitle");
const gameDialogBody = document.getElementById("gameDialogBody");
const playAgainBtn = document.getElementById("playAgainBtn");

let modeKey = "normal";
let gameMode = modes[modeKey];
let currentLevelIndex = 0;
let currentQuestionIndex = 0;
let attemptsLeft = gameMode.attempts;
let score = 0;
let streak = 0;
let bestStreakThisRun = 0;
let livesLeft = gameMode.lives;
let skipsLeft = gameMode.skips;
let revealsLeft = gameMode.reveals;
let completedQuestions = 0;
let hintShown = false;
let isLocked = false;
let timerId = null;
let timeLeft = gameMode.timeLimit;
let bestScore = readStoredInt(storageKeys.bestScore);
let bestStreakAllTime = readStoredInt(storageKeys.bestStreak);

const totalQuestions = levels.reduce((sum, level) => sum + level.questions.length, 0);

function readStoredInt(key) {
  const raw = window.localStorage.getItem(key);
  if (!raw) return 0;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : 0;
}

function writeStoredInt(key, value) {
  window.localStorage.setItem(key, String(value));
}

function shuffleQuestions() {
  for (const level of levels) {
    for (let i = level.questions.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = level.questions[i];
      level.questions[i] = level.questions[j];
      level.questions[j] = tmp;
    }
  }
}

function resetGame() {
  stopTimer();
  modeKey = modeSelect.value in modes ? modeSelect.value : "normal";
  gameMode = modes[modeKey];
  shuffleQuestions();
  currentLevelIndex = 0;
  currentQuestionIndex = 0;
  attemptsLeft = gameMode.attempts;
  score = 0;
  streak = 0;
  bestStreakThisRun = 0;
  livesLeft = gameMode.lives;
  skipsLeft = gameMode.skips;
  revealsLeft = gameMode.reveals;
  completedQuestions = 0;
  hintShown = false;
  isLocked = false;
  timeLeft = gameMode.timeLimit;
  feedback.textContent = "";
  feedback.className = "feedback";
  assistText.classList.add("hidden");
  assistText.textContent = "";
  if (levelDialog.open) levelDialog.close();
  if (gameDialog.open) gameDialog.close();
  updateUI();
  startTimer();
  answerInput.focus();
}

function getCurrentLevel() {
  return levels[currentLevelIndex];
}

function getCurrentQuestion() {
  return getCurrentLevel().questions[currentQuestionIndex];
}

function setFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
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

function updateProgress() {
  const ratio = Math.round((completedQuestions / totalQuestions) * 100);
  progressFill.style.width = `${ratio}%`;
  progressText.textContent = `${ratio}%`;
}

function updateTimerUI() {
  const full = gameMode.timeLimit || 1;
  const ratio = Math.max(0, Math.min(100, (timeLeft / full) * 100));
  timerText.textContent = `${timeLeft}s`;
  timerFill.style.width = `${ratio}%`;
  timerFill.classList.remove("warn", "danger");
  if (ratio <= 50 && ratio > 25) timerFill.classList.add("warn");
  if (ratio <= 25) timerFill.classList.add("danger");
}

function updateMetaInfo() {
  metaInfo.textContent =
    `Mode: ${gameMode.label} | Skips: ${skipsLeft} | Reveals: ${revealsLeft} | Best Streak: ${bestStreakAllTime}`;
}

function updateUI() {
  const level = getCurrentLevel();
  const question = getCurrentQuestion();
  levelLabel.textContent = level.name;
  scoreValue.textContent = String(score);
  triesValue.textContent = String(attemptsLeft);
  livesValue.textContent = String(livesLeft);
  streakValue.textContent = String(streak);
  bestScoreValue.textContent = String(bestScore);
  levelDescription.textContent = level.description;
  clueText.textContent = question.clue;
  hintText.textContent = `Hint: ${question.hint}`;
  hintText.classList.toggle("hidden", !hintShown);
  hintBtn.textContent = hintShown ? "Hide Hint" : "Show Hint";
  revealBtn.disabled = isLocked || revealsLeft <= 0;
  skipBtn.disabled = isLocked || skipsLeft <= 0;
  answerInput.value = "";
  answerInput.disabled = isLocked;
  hintBtn.disabled = isLocked;
  updateProgress();
  updateTimerUI();
  updateMetaInfo();
  renderChips();
}

function lockInput(locked) {
  isLocked = locked;
  answerInput.disabled = locked;
  hintBtn.disabled = locked;
  revealBtn.disabled = locked || revealsLeft <= 0;
  skipBtn.disabled = locked || skipsLeft <= 0;
}

function startTimer() {
  stopTimer();
  timeLeft = gameMode.timeLimit;
  updateTimerUI();
  timerId = window.setInterval(() => {
    if (isLocked) return;
    timeLeft -= 1;
    updateTimerUI();
    if (timeLeft <= 0) {
      stopTimer();
      handleQuestionFailure("Time is up!");
    }
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function popScore() {
  scoreCard.classList.remove("score-pop");
  void scoreCard.offsetWidth;
  scoreCard.classList.add("score-pop");
}

function launchConfetti(count = 90) {
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

    window.setTimeout(() => {
      piece.remove();
    }, duration + delay + 40);
  }
}

function saveBestStats() {
  if (score > bestScore) {
    bestScore = score;
    writeStoredInt(storageKeys.bestScore, bestScore);
  }
  if (bestStreakThisRun > bestStreakAllTime) {
    bestStreakAllTime = bestStreakThisRun;
    writeStoredInt(storageKeys.bestStreak, bestStreakAllTime);
  }
  bestScoreValue.textContent = String(bestScore);
}

function goToNextQuestion() {
  const level = getCurrentLevel();
  const isEndOfLevel = currentQuestionIndex >= level.questions.length - 1;

  if (!isEndOfLevel) {
    currentQuestionIndex += 1;
    attemptsLeft = gameMode.attempts;
    hintShown = false;
    assistText.classList.add("hidden");
    assistText.textContent = "";
    lockInput(false);
    updateUI();
    startTimer();
    answerInput.focus();
    return;
  }

  if (currentLevelIndex < levels.length - 1) {
    levelDialogTitle.textContent = `${level.name} Cleared`;
    levelDialogBody.textContent = `Score: ${score}. Lives left: ${livesLeft}. Get ready for the next level.`;
    if (!levelDialog.open) levelDialog.showModal();
    return;
  }

  endGame(true);
}

function endGame(isVictory) {
  stopTimer();
  lockInput(true);
  saveBestStats();
  if (isVictory) {
    launchConfetti(120);
    gameDialogTitle.textContent = "You finished Word Quest!";
    gameDialogBody.textContent = `Final score: ${score}. Best streak this run: ${bestStreakThisRun}.`;
  } else {
    gameDialogTitle.textContent = "Run Ended";
    gameDialogBody.textContent = `Final score: ${score}. You can start a new run and try a different mode.`;
  }
  if (!gameDialog.open) gameDialog.showModal();
}

function handleQuestionFailure(prefix, applyPenalty = true) {
  lockInput(true);
  const answer = getCurrentQuestion().answer;
  completedQuestions += 1;
  livesLeft -= 1;
  streak = 0;
  if (applyPenalty) {
    score = Math.max(0, score - gameMode.wrongPenalty);
  }
  if (livesLeft <= 0) {
    setFeedback(`${prefix} No lives left. Answer: ${answer}.`, "error");
    updateUI();
    window.setTimeout(() => endGame(false), 900);
    return;
  }
  setFeedback(`${prefix} Answer: ${answer}. Lives left: ${livesLeft}.`, "error");
  updateUI();
  window.setTimeout(goToNextQuestion, 1000);
}

function handleCorrectAnswer() {
  stopTimer();
  lockInput(true);
  completedQuestions += 1;
  streak += 1;
  bestStreakThisRun = Math.max(bestStreakThisRun, streak);
  const level = getCurrentLevel();
  const streakBonus = streak >= 2 ? (streak - 1) * 2 : 0;
  const points = Math.round(level.basePoints * gameMode.scoreMultiplier + streakBonus);
  score += points;
  saveBestStats();
  popScore();
  setFeedback(`Correct! +${points} points.`, "success");
  updateUI();
  launchConfetti(55);
  window.setTimeout(goToNextQuestion, 700);
}

function handleWrongAttempt() {
  attemptsLeft -= 1;
  streak = 0;
  score = Math.max(0, score - gameMode.wrongPenalty);
  if (attemptsLeft <= 0) {
    handleQuestionFailure("No tries left.", false);
    return;
  }
  setFeedback(`Not correct. ${attemptsLeft} tries left.`, "error");
  updateUI();
}

function revealLetter() {
  if (revealsLeft <= 0 || isLocked) return;
  const answer = getCurrentQuestion().answer;
  revealsLeft -= 1;
  const first = answer[0];
  const last = answer[answer.length - 1];
  assistText.textContent = `Reveal: first letter "${first}", last letter "${last}".`;
  assistText.classList.remove("hidden");
  score = Math.max(0, score - 1);
  updateUI();
}

function skipQuestion() {
  if (skipsLeft <= 0 || isLocked) return;
  stopTimer();
  lockInput(true);
  skipsLeft -= 1;
  completedQuestions += 1;
  streak = 0;
  setFeedback(`Skipped. Answer was "${getCurrentQuestion().answer}".`, "error");
  updateUI();
  window.setTimeout(goToNextQuestion, 700);
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isLocked) return;
  const guess = answerInput.value.trim().toLowerCase();
  if (!guess) return;
  if (guess === getCurrentQuestion().answer) {
    handleCorrectAnswer();
    return;
  }
  handleWrongAttempt();
});

hintBtn.addEventListener("click", () => {
  hintShown = !hintShown;
  hintText.classList.toggle("hidden", !hintShown);
  hintBtn.textContent = hintShown ? "Hide Hint" : "Show Hint";
});

revealBtn.addEventListener("click", revealLetter);
skipBtn.addEventListener("click", skipQuestion);

nextLevelBtn.addEventListener("click", () => {
  if (levelDialog.open) levelDialog.close();
  currentLevelIndex += 1;
  currentQuestionIndex = 0;
  attemptsLeft = gameMode.attempts;
  hintShown = false;
  assistText.classList.add("hidden");
  assistText.textContent = "";
  lockInput(false);
  updateUI();
  startTimer();
  answerInput.focus();
});

playAgainBtn.addEventListener("click", () => {
  if (gameDialog.open) gameDialog.close();
  resetGame();
});

restartBtn.addEventListener("click", resetGame);
modeSelect.addEventListener("change", resetGame);

resetGame();
