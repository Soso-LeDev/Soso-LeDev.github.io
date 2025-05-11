let audio = new Audio("frozen-landscape-116197.mp3");
audio.loop = true;
audio.volume = 0.6;

const introText = [
  "Un fracas. Un souffle. Le silence.",
  "Le monde que tu connaissais a disparu.",
  "Tu ouvres les yeux dans un autre univers.",
  "Ici, la magie remplace la science...",
  "Et ta survie dépendra de ce que tu construis."
];

let currentLine = 0;

function startIntro() {
  // Lancer la musique après clic utilisateur
  audio.play().catch(() => {
    console.warn("Autoplay bloqué, clic requis.");
  });

  const overlay = document.getElementById("intro-overlay");
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.display = "none";
    showNextLine();
  }, 1000);
}

function showNextLine() {
  const textBox = document.getElementById("intro-text");
  if (currentLine < introText.length) {
    textBox.innerText = "";
    typeWriter(introText[currentLine], textBox, () => {
      currentLine++;
      setTimeout(showNextLine, 2500);
    });
  } else {
    setTimeout(() => {
      window.location.href = "game.html";
    }, 1500);
  }
}

function typeWriter(text, element, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 40);
    } else {
      callback();
    }
  }
  type();
}

window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("intro-overlay");
  overlay.addEventListener("click", startIntro);
});
