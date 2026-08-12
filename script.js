// ===========================================================
// AUSTIN BREWS - PRODUCTION script.js
// ===========================================================

// 1. Dynamic Date Locking (Prevent past date selection)
const dateInput = document.getElementById('date');

if (dateInput) {
    const today = new Date();
    // Convert today's date to YYYY-MM-DD format
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    
    // Set HTML5 min attribute
    dateInput.min = formattedToday;
}

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

// 2. Validate Operating Hours (8:00 AM to 10:00 PM)
const timeInput = document.getElementById('time').value; // Returns "04:00" format

if (timeInput < "08:00" || timeInput > "22:00") {
    alert('Austin Brews is only open from 8:00 AM to 10:00 PM. Please select a time within operating hours.');
    return; // Stop form submission before fetch()
}

// 3. Form Handling & Web3Forms API Integration
if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Read the selected date value
        const selectedDate = new Date(dateInput.value);
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Strip time portion for pure date comparison

        // If selected date is in the past, block submission before fetch()
        if (selectedDate < now) {
            alert('Please select today or a future date for your reservation.');
            return; // Exit execution early - fetch() never runs
        }

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

// 4. Close Modal Events
if (modalOverlay) {
    const closeModalBtn = modalOverlay.querySelector('.modal-close');
    
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        reservationForm.reset(); // Ensures inputs are clean for next attempt
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}
