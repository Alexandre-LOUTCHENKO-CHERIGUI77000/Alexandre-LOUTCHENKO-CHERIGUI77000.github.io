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
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const element = document.querySelector("main");

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    pdf.save("CV_Alexandre_LOUTCHENKO_CHERIGUI.pdf");
}