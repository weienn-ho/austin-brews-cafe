// Grab DOM elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

// Toggle menu visibility on hamburger click
hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Auto-close mobile menu when user selects an anchor link
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Form Handing & Modal Logic

// Grab DOM Elements
const reservationForm = document.getElementById('reservation-form');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalUserName = document.getElementById('modal-user-name');

// Intercept Form Submission
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        // Prevent default page reload
        e.preventDefault();

        // Extract user's name from input field
        const nameInput = document.getElementById('name').value;

        // Insert name into modal text dynamically
        modalUserName.textContent = nameInput;

        // Display modal
        modalOverlay.classList.add('active');

        // Clear input fields 
        reservationForm.reset();
    });
}

// Close Modal on Button Click
closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Close Modal on Backdrop Click
window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});