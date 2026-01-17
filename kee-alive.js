const http = require("http");
const fetch = require("node-fetch"); // si tu n'as pas fetch natif

const BOT_URL = "https://TON-PROJET.repl.co"; // Mets l'URL de ton Replit

function pingBot() {
  fetch(BOT_URL)
    .then(res => console.log(`Ping réussi à ${new Date()}: ${res.status}`))
    .catch(err => console.log(`Erreur ping: ${err}`));
}

// Ping toutes les 4 minutes
setInterval(pingBot, 4 * 60 * 1000);

// Premier ping immédiat
pingBot();
