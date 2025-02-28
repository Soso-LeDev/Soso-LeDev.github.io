const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const passwordInput = document.querySelector('input[type="password"]');
const passwordStrengthIndicator = document.getElementById('passwordStrength');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    let strength = 'Faible';

    if (password.length > 8) {
        strength = 'Moyenne';
    }
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && password.length > 10) {
        strength = 'Forte';
    }

    passwordStrengthIndicator.textContent = `Force du mot de passe: ${strength}`;
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        alert("Formulaire soumis !"); 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".from-box.register form");
    const loginForm = document.querySelector(".from-box.login form");

    // Fonction pour afficher un message d'erreur
    function showError(form, message) {
        let errorBox = form.querySelector(".error-message");
        if (!errorBox) {
            errorBox = document.createElement("p");
            errorBox.classList.add("error-message");
            errorBox.style.color = "red";
            errorBox.style.marginTop = "10px";
            form.appendChild(errorBox);
        }
        errorBox.textContent = message;
    }

    // Inscription
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = this.querySelector('input[placeholder="Username"]').value;
        const email = this.querySelector('input[placeholder="Email"]').value;
        const password = this.querySelector('input[placeholder="Password"]').value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let existingUser = users.find(user => user.username === username);

        if (existingUser) {
            showError(registerForm, "Ce nom d'utilisateur est déjà pris !");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("loggedInUser", username); // Auto-login après inscription
        window.location.href = "accueil.html"; // Redirection vers la page d'accueil
    });

    // Connexion
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = this.querySelector('input[placeholder="Username"]').value;
        const password = this.querySelector('input[placeholder="Password"]').value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            localStorage.setItem("loggedInUser", username);
            window.location.href = "accueil.html"; // Redirection vers la page d'accueil
        } else {
            showError(loginForm, "Nom d'utilisateur ou mot de passe incorrect.");
        }
    });
});



