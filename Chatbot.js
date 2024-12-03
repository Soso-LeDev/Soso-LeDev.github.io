const submitButton = document.getElementById("submit");
const inputField = document.getElementById("inputField");
const chatBox = document.getElementById("chatBox");

submitButton.addEventListener("click", function () {
    const question = inputField.value;
    if (question.trim() !== "") {
        appendMessage("Utilisateur", question);

        // URL du serveur backend (remplacer par l'IP de votre machine ou l'URL de production)
        const backendUrl = "http://192.168.1.100:6259/ask";  // Utilisez l'IP locale de votre machine ou l'URL du serveur en ligne

        fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: question }),
        })
            .then(response => response.text())
            .then(data => {
                setTimeout(() => { // Ajoute une latence de 1/2 seconde pour simuler la réflexion du bot
                    appendMessage("Bot", data);
                }, 500);
            })
            .catch(error => {
                console.error("Erreur:", error);
                appendMessage("Bot", "Désolé, une erreur est survenue.");
            });

        inputField.value = "";  // Réinitialiser le champ de saisie
    }
});

function appendMessage(role, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(role);
    messageElement.innerText = `${role}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroller vers le bas
}
