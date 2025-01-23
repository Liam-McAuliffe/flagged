// Import list of flags and the respective names
import { flags } from "./flag_list.js";

// Variables
let randomFlag;
let score = 0;

// Chose a random flag based on its index and set it to the image
function displayRandomFlag() {
  const randomIndex = Math.floor(Math.random() * flags.length);
  randomFlag = flags[randomIndex];
  const flagImage = document.getElementById("flag");
  flagImage.src = randomFlag.image;
  flagImage.alt = "Random Flag";
}

// Update the score text to equal the score variable
function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
}

// Fill the custom dropdown with the names that fit the query from input
function populateCountryList() {
  const input = document.getElementById("guess");
  const dropdown = document.getElementById("custom-dropdown");
  const query = input.value.trim().toLowerCase();

  // Clear the dropdown
  dropdown.innerHTML = "";
  // Only accept over 0 characters
  if (query.length > 0) {
    const filteredCountries = flags.filter((flag) =>
      flag.country.toLowerCase().includes(query)
    );
    filteredCountries.forEach((flag) => {
      const option = document.createElement("div");
      option.classList.add("dropdown-item");
      option.textContent = flag.country;
      // If you click a country from the dropdown, check if it's correct
      option.addEventListener("click", () => {
        input.value = flag.country;
        checkGuess();
      });
      dropdown.appendChild(option);
    });
  }
}

// Check the guess of the input
function checkGuess() {
  const userGuess = document.getElementById("guess").value.trim().toLowerCase();
  const dropdown = document.getElementById("custom-dropdown");

  // If the guess matches the country name
  if (userGuess === randomFlag.country.toLowerCase()) {
    score++;
    dropdown.innerHTML = "";
    document.body.classList.add("animate-background", "correct-bg");
    document.getElementById("previous-flag").textContent = "";
    // If it does not match
  } else {
    score = 0;
    dropdown.innerHTML = "";
    document.body.classList.add("animate-background", "incorrect-bg");
    document.getElementById("previous-flag").textContent =
      "Previous: " + randomFlag.country;
  }
  // No matter what
  updateScore();
  console.log("update score");
  displayRandomFlag();
  console.log("new flag");
  document.getElementById("guess").value = "";
  console.log("clear input");
  setTimeout(() => {
    document.body.classList.remove(
      "animate-background",
      "correct-bg",
      "incorrect-bg"
    );
  }, 500);
  console.log("remove animation");
}

function back() {
  window.history.back();
}

document.getElementById("back").addEventListener("click", function () {
  back();
});

// On input populate the dropdown
document.getElementById("guess").addEventListener("input", function () {
  populateCountryList();
});

// On enter check guess
document.getElementById("guess").addEventListener("keypress", function (event) {
  if (event.key === "Enter" && event.target.value.trim() !== "") {
    checkGuess();
  }
});

// Once page is loaded update score and display a flag
document.addEventListener("DOMContentLoaded", () => {
  updateScore();
  displayRandomFlag();
});
