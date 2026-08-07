// ===========================================================
// AUSTIN BREWS - PRODUCTION script.js
// ===========================================================

// 1. DOM Element Selection
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const reservationForm = document.getElementById('reservation-form');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalUserName = document.getElementById('modal-user-name');

// 2. Mobile Navigation Toggle
if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Auto-close mobile menu when an anchor link is selected
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// 3. Form Handling & Web3Forms API Integration
if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = reservationForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Visual UX Feedback: Disable button while waiting for network response
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(reservationForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Extract name for custom confirmation modal
                const nameInput = document.getElementById('name').value;
                modalUserName.textContent = nameInput;
                
                // Display success modal and clear inputs
                modalOverlay.classList.add('active');
                reservationForm.reset();
            } else {
                alert('Submission failed: ' + data.message);
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
        } finally {
            // Reset button state regardless of success/failure
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// 4. Close Modal Events
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});