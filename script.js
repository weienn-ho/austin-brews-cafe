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

// 3. Form Handling & Modal Trigger
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name').value;
        modalUserName.textContent = nameInput;
        modalOverlay.classList.add('active');
        reservationForm.reset();
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