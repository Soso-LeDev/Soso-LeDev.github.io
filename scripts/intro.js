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
  audio = new Audio("assets/caves-of-dawn.mp3");
  audio.loop = true;
  audio.volume = 0.5;
  audio.play().catch(() => {
    console.warn("Autoplay bloqué");
  });

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
    }, 40);
  }

  function nextLine() {
    if (currentLine < introText.length) {
      typeLine(introText[currentLine], () => {
        currentLine++;
        setTimeout(nextLine, 2000);
      });
    } else {
      const btn = document.getElementById("start-btn");
      btn.classList.add("show");
    }
  }

  nextLine();
}

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("introShown")) {
    showIntro();
    localStorage.setItem("introShown", "true");
  } else {
    window.location.href = "game.html";
  }
});

function startGame() {
  audio?.pause();
  window.location.href = "game.html";
}
