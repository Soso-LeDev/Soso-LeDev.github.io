const introText = [
  "Il était une fois, un monde paisible...",
  "Mais une catastrophe a tout changé.",
  "Un réveil dans un lieu inconnu,",
  "où la magie et les créatures fantastiques dominent.",
  "Ton objectif ? Survivre. Comprendre. Reconstruire."
];

let currentLine = 0;
let audio;

function showIntro() {
  const textBox = document.getElementById("intro-text");

  // Jouer la musique après un certain délai
  const playMusic = () => {
    if (!audio) {
      audio = new Audio("frozen-landscape-116197.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch((err) => {
        console.warn("Autoplay bloqué. Cliquez pour démarrer l'audio.");
      });
    }
  };

  // Animation de machine à écrire sans coupures
  function typeLine(line, callback) {
    textBox.innerText = line;
    textBox.classList.add("fade-in");
    callback();
  }

  function nextLine() {
    if (currentLine < introText.length) {
      typeLine(introText[currentLine], () => {
        currentLine++;
        setTimeout(nextLine, 3000); // Attente entre les lignes pour immersion
      });
    } else {
      // Fin de l'intro, ajout d'un effet de transition pour faire la transition vers le jeu
      setTimeout(() => {
        window.location.href = "game.html"; // Redirection après l'intro
      }, 1500);
    }
  }

  // Intro avec un effet de fondu de fond et de texte
  document.body.style.backgroundColor = "#0d0d0d";
  setTimeout(() => {
    playMusic();
    textBox.classList.remove("fade-in");
    nextLine(); // Commence l'animation du texte après un léger délai
  }, 1500); // Délai pour l'animation d'intro
}

window.addEventListener("DOMContentLoaded", () => {
  showIntro(); // Lancer l'intro dès que la page est prête
});
