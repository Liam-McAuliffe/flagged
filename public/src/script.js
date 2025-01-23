function startGame() {
  window.location.href = "/game";
}

function practiceMode() {
  window.location.href = "/practice";
}

function login() {
  window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const practiceButton = document.getElementById("practiceButton");
  const loginButton = document.getElementById("loginButton");

  playButton.addEventListener("click", startGame);
  practiceButton.addEventListener("click", practiceMode);
  loginButton.addEventListener("click", () => {
    console.log("Login button clicked");
  });
});
