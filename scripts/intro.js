const introText = [
  "Le monde que tu connaissais... a disparu.",
  "Une catastrophe naturelle a tout balayé.",
  "Tu t'es réveillé seul, dans une terre étrangère.",
  "Ici, la magie règne, les lois de la nature ont changé.",
  "Ton objectif est simple : survivre, comprendre, reconstruire."
];

let currentLine = 0;

function showIntro() {
  const textBox = document.getElementById("intro-text");

  // Musique de fond
  const audio = new Audio("assets/caves-of-dawn.mp3");
  audio.loop = true;
  audio.volume = 0.5;
  audio.play().catch(() => {
    console.warn("Autoplay bloqué par le navigateur.");
  });

  function nextLine() {
    if (currentLine < introText.length) {
      textBox.innerText = introText[currentLine];
      textBox.classList.remove("fade-in");
      void textBox.offsetWidth; // Reset animation
      textBox.classList.add("fade-in");
      currentLine++;
    } else {
      document.getElementById("start-btn").style.display = "inline-block";
    }
  }

  nextLine();
  const interval = setInterval(nextLine, 4000);
}

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("introShown")) {
    showIntro();
    localStorage.setItem("introShown", "true");
  } else {
    window.location.href = "game.html"; // À créer plus tard
  }
});

function startGame() {
  window.location.href = "game.html";
}
