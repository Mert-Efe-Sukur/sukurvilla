// Initialize EmailJS with your public key
emailjs.init("cIcj2daicL2Nro6xf");

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Send the form data using EmailJS
    emailjs.sendForm('service_vh7x6h5', 'template_p4gljfr', '#contact-form')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mesajınız başarıyla gönderildi!');
            document.getElementById('contact-form').reset(); // Reset the form after successful submission
        }, function(error) {
            console.log('FAILED...', error);
            alert('Mesajınız gönderilemedi. Lütfen tekrar deneyin.');
        });
});
