import { flags } from "./flag_list.js";

// Variables
let randomFlag;
let score = 0;
let correctAnswer;

// Chose a random flag based on its index and set it to the image
function displayRandomFlag() {
    const randomIndex = Math.floor(Math.random() * flags.length);
    randomFlag = flags[randomIndex];
    const flagImage = document.getElementById("flag");
    flagImage.src = randomFlag.image;
    flagImage.alt = "Random Flag";
    correctAnswer = randomFlag.country;
    populateChoices();
}

// Update the score text to equal the score variable
function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
}

// Populate the multiple choice options with random countries
function populateChoices() {
    const choicesContainer = document.getElementById("choices");
    const countries = getRandomCountries();

    // Clear any existing choices
    choicesContainer.innerHTML = "";

    countries.forEach((country) => {
        const button = document.createElement("button");
        button.classList.add("choice-button");
        button.textContent = country;
        button.addEventListener("click", () => checkGuess(country));
        choicesContainer.appendChild(button);
    });
}

// Get three random countries for the choices (including the correct one)
function getRandomCountries() {
    const countries = [correctAnswer];
    while (countries.length < 3) {
        const randomCountry =
            flags[Math.floor(Math.random() * flags.length)].country;
        if (!countries.includes(randomCountry)) {
            countries.push(randomCountry);
        }
    }
    // Shuffle the array for random order
    return countries.sort(() => Math.random() - 0.5);
}

// Check if the clicked country is correct
function checkGuess(selectedCountry) {
    const choicesContainer = document.getElementById("choices");

    if (selectedCountry === correctAnswer) {
        score++;
        document.body.classList.add("animate-background", "correct-bg");
        document.getElementById("previous-flag").textContent = "";
    } else {
        score = 0;
        document.body.classList.add("animate-background", "incorrect-bg");
        document.getElementById("previous-flag").textContent =
            "Previous: " + correctAnswer;
    }
    displayRandomFlag();
    updateScore();
    setTimeout(() => {
        document.body.classList.remove(
            "animate-background",
            "correct-bg",
            "incorrect-bg"
        );
    }, 500);
}

// Go back to previous page
function back() {
    window.history.back();
}

document.getElementById("back").addEventListener("click", function () {
    back();
});

// Once page is loaded update score and display a flag
document.addEventListener("DOMContentLoaded", () => {
    updateScore();
    displayRandomFlag();
});
