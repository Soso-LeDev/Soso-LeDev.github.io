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
    }, 40); // Plus rapide pour une animation plus fluide
  }

  function nextLine() {
    if (currentLine < introText.length) {
      typeLine(introText[currentLine], () => {
        currentLine++;
        setTimeout(nextLine, 3000); // Attente entre les lignes
      });
    }
  }

  // Animation de l'intro avant de commencer
  document.body.style.backgroundColor = "#000";
  setTimeout(() => {
    playMusic(); // Demander au joueur de cliquer pour démarrer la musique
    nextLine(); // Lancer l'animation du texte après un délai
  }, 1500); // Délai pour donner le temps de l'intro visuelle
}

window.addEventListener("DOMContentLoaded", () => {
  showIntro(); // L'intro sera toujours affichée au chargement de la page
});

function startGame() {
  if (audio) audio.pause(); // Stop l'audio avant de commencer le jeu
  window.location.href = "game.html"; // À définir plus tard
}
