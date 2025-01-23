import { flags } from "./flag_list.js";

let randomFlag;
let score = 0;
let timer;
let timeLeft = 10;
const totalTime = 10;

function startTimer() {
  timeLeft = totalTime;

  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = "100%";
  progressBar.style.transition = "none";

  if (timer) {
    cancelAnimationFrame(timer);
  }

  let startTime = performance.now();

  function updateProgressBar(timestamp) {
    const elapsedTime = (timestamp - startTime) / 1000;
    const remainingTime = totalTime - elapsedTime;
    if (remainingTime <= 0) {
      progressBar.style.width = "0%";
      score = 0;
      updateScore();
      document.getElementById("previous-flag").textContent =
        "Previous: " + randomFlag.country;
      displayRandomFlag();
      document.body.classList.add("animate-background", "incorrect-bg");
      setTimeout(() => {
        document.body.classList.remove(
          "animate-background",
          "correct-bg",
          "incorrect-bg"
        );
      }, 500);
    } else {
      const progressBarWidth = (remainingTime / totalTime) * 100;
      progressBar.style.width = progressBarWidth + "%";
      timer = requestAnimationFrame(updateProgressBar);
    }
  }

  timer = requestAnimationFrame(updateProgressBar);
}

function displayRandomFlag() {
  const randomIndex = Math.floor(Math.random() * flags.length);
  randomFlag = flags[randomIndex];
  const flagImage = document.getElementById("flag");
  flagImage.src = randomFlag.image;
  flagImage.alt = "Random Flag";
  startTimer();
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
}

function populateCountryList() {
  const input = document.getElementById("guess");
  const dropdown = document.getElementById("custom-dropdown");
  const query = input.value.trim().toLowerCase();

  dropdown.innerHTML = "";

  if (query.length > 0) {
    const filteredCountries = flags.filter((flag) =>
      flag.country.toLowerCase().includes(query)
    );

    filteredCountries.forEach((flag) => {
      const option = document.createElement("div");
      option.classList.add("dropdown-item");
      option.textContent = flag.country;
      option.addEventListener("click", () => {
        input.value = flag.country;
        checkGuess();
      });
      dropdown.appendChild(option);
    });
  }
}

function checkGuess() {
  const userGuess = document.getElementById("guess").value.trim().toLowerCase();
  const dropdown = document.getElementById("custom-dropdown");

  if (userGuess == randomFlag.country.toLowerCase()) {
    score++;
    dropdown.innerHTML = "";
    document.body.classList.add("animate-background", "correct-bg");
    document.getElementById("previous-flag").textContent = "";
  } else {
    score = 0;
    dropdown.innerHTML = "";
    document.body.classList.add("animate-background", "incorrect-bg");
    document.getElementById("previous-flag").textContent =
      "Previous: " + randomFlag.country;
  }
  updateScore();
  displayRandomFlag();
  document.getElementById("guess").value = "";
  setTimeout(() => {
    document.body.classList.remove(
      "animate-background",
      "correct-bg",
      "incorrect-bg"
    );
  }, 500);
}

document.getElementById("guess").addEventListener("input", function () {
  populateCountryList();
});

document.getElementById("guess").addEventListener("keypress", function (event) {
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    checkGuess();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateScore();
  displayRandomFlag();
});
