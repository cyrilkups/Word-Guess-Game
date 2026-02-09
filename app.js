const levels = [
  {
    name: "Level 1 - Starter",
    description: "Easy brain warmups with richer clues.",
    basePoints: 10,
    questions: [
      {
        clue: "I am born deep in earth, never planted, and sometimes sparkle in silence. What am I?",
        answer: "mineral",
        hints: [
          "Geology studies me.",
          "You can find me in rocks and ores.",
          "I start with m and end with l.",
        ],
      },
      {
        clue: "I rise from melted stone that cools and hardens into ancient strength.",
        answer: "igneous",
        hints: [
          "I am a type of rock.",
          "I form from magma or lava.",
          "I start with i and have 7 letters.",
        ],
      },
      {
        clue: "I drift, I settle, I layer; over years I become history under your feet.",
        answer: "sediment",
        hints: [
          "Rivers carry me.",
          "I often gather at the bottom of water.",
          "I start with s and end with t.",
        ],
      },
      {
        clue: "I am a memory of life turned to stone, older than stories.",
        answer: "fossil",
        hints: [
          "Dinosaurs are often known through me.",
          "I preserve traces of ancient organisms.",
          "I start with f and end with l.",
        ],
      },
      {
        clue: "Wind and water carve me slowly; I become a giant path between cliffs.",
        answer: "canyon",
        hints: [
          "I am a deep valley.",
          "The Grand one is world famous.",
          "I start with c and end with n.",
        ],
      },
    ],
  },
  {
    name: "Level 2 - Puzzle",
    description: "Intriguing statements that require sharper thinking.",
    basePoints: 14,
    questions: [
      {
        clue: "I am invisible, always pulling, and no one escapes my reach.",
        answer: "gravity",
        hints: [
          "I keep planets in orbit.",
          "When you jump, I bring you back down.",
          "g......y",
        ],
      },
      {
        clue: "I look the same forward and backward, and I split the day in two.",
        answer: "noon",
        hints: [
          "I happen at midday.",
          "I am a palindrome.",
          "n..n",
        ],
      },
      {
        clue: "Break me with a fall, wake me with a glance, and I always return your face.",
        answer: "mirror",
        hints: [
          "I live on walls and in bathrooms.",
          "I reflect light.",
          "m....r",
        ],
      },
      {
        clue: "I follow you in light, disappear in darkness, and never make a sound.",
        answer: "shadow",
        hints: [
          "I copy your shape.",
          "I am made by blocked light.",
          "s.....w",
        ],
      },
      {
        clue: "You speak to me in mountains and I answer with your own voice.",
        answer: "echo",
        hints: [
          "I repeat what you say.",
          "You hear me in caves and valleys.",
          "e..o",
        ],
      },
    ],
  },
  {
    name: "Level 3 - Master",
    description: "Deeper riddles. Think before every move.",
    basePoints: 20,
    questions: [
      {
        clue: "Feed me and I live; drown me and I vanish instantly.",
        answer: "fire",
        hints: [
          "I need oxygen.",
          "I give warmth and light.",
          "4 letters, starts with f.",
        ],
      },
      {
        clue: "Say my name and I am gone.",
        answer: "silence",
        hints: [
          "Libraries ask for me.",
          "I am the absence of noise.",
          "I start with s and end with e.",
        ],
      },
      {
        clue: "I run forever but never walk. I have a mouth but never eat.",
        answer: "river",
        hints: [
          "I can be calm or wild.",
          "I flow toward seas and lakes.",
          "r...r",
        ],
      },
      {
        clue: "I heal all wounds, steal every moment, and can never be paused in real life.",
        answer: "time",
        hints: [
          "Clocks measure me.",
          "Everyone has the same 24 hours per day.",
          "t..e",
        ],
      },
      {
        clue: "I visit while you sleep, build impossible worlds, and disappear by morning.",
        answer: "dream",
        hints: [
          "I happen in your mind at night.",
          "Nightmares are my darker form.",
          "d...m",
        ],
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
const moreClueBtn = document.getElementById("moreClueBtn");
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
let cluesUsed = 0;
let completedQuestions = 0;
let revealedHintCount = 0;
let hintsVisible = false;
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

function getHintsForQuestion(question) {
  if (Array.isArray(question.hints) && question.hints.length > 0) {
    return question.hints;
  }
  if (typeof question.hint === "string" && question.hint.trim()) {
    return [question.hint];
  }
  return [];
}

function renderHintPanel() {
  const question = getCurrentQuestion();
  const hints = getHintsForQuestion(question);

  if (!hintsVisible || revealedHintCount === 0 || hints.length === 0) {
    hintText.classList.add("hidden");
    hintText.textContent = "";
    hintBtn.textContent = hints.length > 0 ? "Show Hint" : "No Hints";
    moreClueBtn.textContent = "More Clue";
    return;
  }

  const activeHints = hints.slice(0, revealedHintCount);
  const compiled = activeHints.map((hint, idx) => `${idx + 1}. ${hint}`).join("  ");
  hintText.textContent = `Clues: ${compiled}`;
  hintText.classList.remove("hidden");
  hintBtn.textContent = "Hide Hints";
  moreClueBtn.textContent =
    revealedHintCount >= hints.length ? "All Clues Used" : "More Clue";
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
  cluesUsed = 0;
  completedQuestions = 0;
  revealedHintCount = 0;
  hintsVisible = false;
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
    `Mode: ${gameMode.label} | Skips: ${skipsLeft} | Reveals: ${revealsLeft} | Clues Used: ${cluesUsed} | Best Streak: ${bestStreakAllTime}`;
}

function updateUI(options = {}) {
  const { preserveInput = false } = options;
  const level = getCurrentLevel();
  const question = getCurrentQuestion();
  const hints = getHintsForQuestion(question);
  const moreCluesAvailable = revealedHintCount < hints.length;

  levelLabel.textContent = level.name;
  scoreValue.textContent = String(score);
  triesValue.textContent = String(attemptsLeft);
  livesValue.textContent = String(livesLeft);
  streakValue.textContent = String(streak);
  bestScoreValue.textContent = String(bestScore);
  levelDescription.textContent = level.description;
  clueText.textContent = question.clue;

  renderHintPanel();

  revealBtn.disabled = isLocked || revealsLeft <= 0;
  skipBtn.disabled = isLocked || skipsLeft <= 0;
  hintBtn.disabled = isLocked || hints.length === 0;
  moreClueBtn.disabled = isLocked || hints.length === 0 || !moreCluesAvailable;

  if (!preserveInput) {
    answerInput.value = "";
  }
  answerInput.disabled = isLocked;
  updateProgress();
  updateTimerUI();
  updateMetaInfo();
  renderChips();
}

function lockInput(locked) {
  isLocked = locked;
  answerInput.disabled = locked;
  revealBtn.disabled = locked || revealsLeft <= 0;
  skipBtn.disabled = locked || skipsLeft <= 0;
  hintBtn.disabled = locked;
  moreClueBtn.disabled = locked;
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
    revealedHintCount = 0;
    hintsVisible = false;
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
  updateUI({ preserveInput: true });
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

function unlockNextClue() {
  if (isLocked) return;
  const hints = getHintsForQuestion(getCurrentQuestion());
  if (revealedHintCount >= hints.length || hints.length === 0) return;
  revealedHintCount += 1;
  hintsVisible = true;
  cluesUsed += 1;
  score = Math.max(0, score - 1);
  setFeedback(`Clue ${revealedHintCount}/${hints.length} unlocked (-1 point).`, "success");
  updateUI({ preserveInput: true });
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
  if (isLocked) return;
  const hints = getHintsForQuestion(getCurrentQuestion());
  if (hints.length === 0) return;

  if (hintsVisible) {
    hintsVisible = false;
    updateUI({ preserveInput: true });
    return;
  }

  if (revealedHintCount === 0) {
    unlockNextClue();
    return;
  }

  hintsVisible = true;
  setFeedback("Hints shown.", "success");
  updateUI({ preserveInput: true });
});

moreClueBtn.addEventListener("click", unlockNextClue);
revealBtn.addEventListener("click", revealLetter);
skipBtn.addEventListener("click", skipQuestion);

nextLevelBtn.addEventListener("click", () => {
  if (levelDialog.open) levelDialog.close();
  currentLevelIndex += 1;
  currentQuestionIndex = 0;
  attemptsLeft = gameMode.attempts;
  revealedHintCount = 0;
  hintsVisible = false;
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
