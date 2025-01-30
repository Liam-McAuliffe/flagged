function startGame() {
    window.location.href = "/game";
}

function practiceMode() {
    window.location.href = "/practice";
}

document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playButton");
    const practiceButton = document.getElementById("practiceButton");

    playButton.addEventListener("click", startGame);
    practiceButton.addEventListener("click", practiceMode);
});
