// ⚡ Initialisation EmailJS avec ta vraie Public Key
emailjs.init("fNh1DY5NX9oNLB3dt"); // <-- Remplace par ta Public Key

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM chargé, script OK");

    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    if (!form || !messageDiv) {
        console.error("Formulaire ou div message introuvable !");
        return;
    }

    console.log("Formulaire trouvé :", form);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Submit déclenché");

        emailjs.sendForm(
            'service_mhv4w0m',    // <-- Remplace par ton Service ID
            'template_a77gola',   // <-- Remplace par ton Template ID
            this
        )
        .then(function() {
            messageDiv.innerHTML = "Message envoyé avec succès ! ✅";
            messageDiv.style.color = "green";
            form.reset();
            console.log("Email envoyé avec succès !");
        }, function(error) {
            messageDiv.innerHTML = "Erreur, le message n'a pas pu être envoyé ❌";
            messageDiv.style.color = "red";
            console.error('EmailJS error:', error);
        });
    });
});