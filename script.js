// ===========================================================
// AUSTIN BREWS - DIAGNOSTIC script.js
// ===========================================================

// TEST 1: Check if the browser is reading this JavaScript file
alert("DIAGNOSTIC STEP 1: script.js is loaded and running!");

// 1. DOM Element Selection
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const reservationForm = document.getElementById('reservation-form');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalUserName = document.getElementById('modal-user-name');

// TEST 2: Check if the elements exist in your HTML
if (!hamburgerBtn) {
    alert("DIAGNOSTIC ERROR: Cannot find element with id='hamburger-btn' in your HTML!");
}
if (!navLinks) {
    alert("DIAGNOSTIC ERROR: Cannot find element with id='nav-links' in your HTML!");
}

// 2. Mobile Navigation Toggle
if (hamburgerBtn && navLinks) {
    alert("DIAGNOSTIC STEP 2: Elements found successfully!");

    hamburgerBtn.addEventListener('click', () => {
        // TEST 3: Check if the click event is being captured
        alert("DIAGNOSTIC STEP 3: Hamburger button was clicked!");
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