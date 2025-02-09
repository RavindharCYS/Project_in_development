// assets/js/ribbon.js
document.addEventListener('DOMContentLoaded', function() {
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

        // You can add your form processing logic here
        alert('Thank you, ' + userName + '! We will notify you soon.');

        // Reset form and close modal
        this.reset();
        closeRibbonModal();
    });
});