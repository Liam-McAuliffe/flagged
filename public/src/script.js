// Navigate to the game page
function startGame() {
  window.location.href = "html/game.html";
}

function practiceMode() {
  window.location.href = "html/practice.html"; // Replace with the actual path to the practice page
}

function login() {
  // Handle login functionality (redirect, modal, etc.)
  console.log("Login button clicked");
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get buttons by their IDs
  const playButton = document.getElementById("playButton");
  const practiceButton = document.getElementById("practiceButton");
  const loginButton = document.getElementById("loginButton");

  // Add event listeners to buttons
  playButton.addEventListener("click", startGame);
  practiceButton.addEventListener("click", practiceMode); // You may need to implement the practiceMode function
  loginButton.addEventListener("click", login); // You may need to implement the login function
});
