const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const LOG_FILE = "Logs.txt";

function logConversation(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);
}

function readConversationHistory() {
    try {
        const data = fs.readFileSync(LOG_FILE, 'utf8');
        return data.split("\n").filter(line => line.trim() !== '');
    } catch (error) {
        console.error("Erreur de lecture du fichier de logs :", error);
        return [];
    }
}

app.post('/ask', async (req, res) => {
    const question = req.body.question;

    const groq = new Groq({
        apiKey: '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'
    });

    try {
        logConversation(`Utilisateur : ${question}`);

        // Récupération de l'historique des conversations
        const conversationHistory = readConversationHistory();

        // Ajout de l'historique de la conversation précédente à la nouvelle requête
        const messages = conversationHistory.map(line => {
            const [timestamp, message] = line.split('] ');
            if (message.startsWith('Utilisateur :')) {
                return { role: 'user', content: message.replace('Utilisateur : ', '') };
            } else if (message.startsWith('IA :')) {
                return { role: 'assistant', content: message.replace('IA : ', '') };
            }
        }).filter(Boolean); // Retirer les lignes non formatées

        messages.push({
            role: "user",
            content: question,
        });

        const response = await groq.chat.completions.create({
            messages: [
                { role: "system", content: `Tu dois répondre en français.` },
                ...messages
            ],
            model: "llama3-70b-8192"
        });

        const responseToSend = response.choices[0].message.content.replaceAll(", ", ",");
        logConversation(`IA : ${responseToSend}`);
        res.send(responseToSend);

    } catch (error) {
        logConversation("Erreur : Une erreur est survenue lors du traitement.");
        res.status(500).send("Erreur de traitement de la demande");
    }
});

app.listen(6259, () => {
    console.log("Le serveur est en cours d'exécution sur le port 6259");
});

