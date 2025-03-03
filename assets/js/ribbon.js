// assets/js/ribbon.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("YOUR_USER_ID_HERE");

    const modal = document.getElementById('ribbonModal');
    
    window.openRibbonModal = function() {
        modal.style.display = 'block';
    }

    window.closeRibbonModal = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeRibbonModal();
        }
    }

    // Handle form submission
    document.getElementById('ribbonForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const userName = document.getElementById('ribbonName').value;
        const userMobile = document.getElementById('ribbonMobile').value;
        const userEmail = document.getElementById('ribbonEmail').value;

        // Prepare template parameters
        const templateParams = {
            from_name: userName,
            from_email: userEmail,
            mobile_number: userMobile,
            to_name: 'Admin', // Change this to your preferred recipient name
            message: `New form submission:
                Name: ${userName}
                Email: ${userEmail}
                Mobile: ${userMobile}`
        };

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        // Send email using EmailJS
        emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            templateParams
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you, ' + userName + '! Your message has been sent successfully.');
            
            // Reset form and close modal
            document.getElementById('ribbonForm').reset();
            closeRibbonModal();
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        })
        .finally(function() {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
    });
});