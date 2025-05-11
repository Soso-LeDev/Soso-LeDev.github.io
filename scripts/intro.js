const introText = [
  "Le monde que tu connaissais... a disparu.",
  "Une catastrophe naturelle a tout balayé.",
  "Tu t'es réveillé seul, dans une terre étrangère.",
  "Ici, la magie règne, les lois de la nature ont changé.",
  "Ton objectif est simple : survivre, comprendre, reconstruire."
];

let currentLine = 0;
let audio;

function showIntro() {
  const textBox = document.getElementById("intro-text");

  // Affichage de la musique lors du clic sur "Commencer"
  const playMusic = () => {
    if (!audio) {
      audio = new Audio("assets/caves-of-dawn.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch((err) => {
        console.warn("Autoplay bloqué. Cliquez pour démarrer l'audio.");
      });
    }
  };

  // Fonction "machine à écrire" pour chaque ligne de texte
  function typeLine(line, callback) {
    textBox.innerText = "";
    textBox.classList.remove("fade-in");
    let i = 0;
    const typing = setInterval(() => {
      textBox.innerText += line.charAt(i);
      i++;
      if (i === line.length) {
        clearInterval(typing);
        textBox.classList.add("fade-in");
        callback();
      }
    }, 60); // Vitesse d'écriture (plus lent que précédemment)
  }

  function nextLine() {
    if (currentLine < introText.length) {
      typeLine(introText[currentLine], () => {
        currentLine++;
        setTimeout(nextLine, 3000); // Attente entre les lignes
      });
    } else {
      const btn = document.getElementById("start-btn");
      btn.classList.add("show");
    }
  }

  // Initialisation du texte
  nextLine();

  // Demander au joueur de cliquer pour démarrer la musique
  document.getElementById("intro-container").addEventListener("click", playMusic);
}

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("introShown")) {
    showIntro();
    localStorage.setItem("introShown", "true");
  } else {
    window.location.href = "game.html"; // Dirige vers la page de jeu une fois l'intro terminée
  }
});

function startGame() {
  if (audio) audio.pause(); // Stop l'audio avant de commencer le jeu
  window.location.href = "game.html"; // À définir plus tard
}
