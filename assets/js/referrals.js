// referrals.js
// Initialize EmailJS
(function() {
    // Replace with your EmailJS public key
    emailjs.init("1EhhJ0VwoJLPSdP5J");
})();

document.getElementById('referralForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const formData = {
        // Student details
        studentName: document.getElementById('studentName').value,
        studentMobile: document.getElementById('studentMobile').value,
        studentEmail: document.getElementById('studentEmail').value,
        // Referral details
        referralName: document.getElementById('referralName').value,
        referralMobile: document.getElementById('referralMobile').value,
        referralEmail: document.getElementById('referralEmail').value
    };

    // Basic validation
    for (let key in formData) {
        if (!formData[key]) {
            alert('Please fill in all required fields');
            return;
        }
    }

    // Validate mobile numbers
    if (!/^[0-9]{10}$/.test(formData.studentMobile) || 
        !/^[0-9]{10}$/.test(formData.referralMobile)) {
        alert('Please enter valid 10-digit mobile numbers');
        return;
    }

    // Validate emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.studentEmail) || 
        !emailRegex.test(formData.referralEmail)) {
        alert('Please enter valid email addresses');
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.send(
        'service_mjpss3c', // Replace with your EmailJS service ID
        'template_drq9m83', // Replace with your EmailJS template ID
        {
            // Student details
            student_name: formData.studentName,
            student_mobile: formData.studentMobile,
            student_email: formData.studentEmail,
            // Referral details
            referral_name: formData.referralName,
            referral_mobile: formData.referralMobile,
            referral_email: formData.referralEmail
        }
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Referral submitted successfully!');
        document.getElementById('referralForm').reset();
    })
    .catch(function(error) {
        console.log('FAILED...', error);
        alert('Failed to submit referral. Please try again.');
    })
    .finally(function() {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Submit Referral';
        submitBtn.disabled = false;
    });
});