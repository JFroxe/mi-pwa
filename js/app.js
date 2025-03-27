document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerLink = document.getElementById('show-register');
    const registerForm = document.getElementById('register-form');
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    const tabs = document.querySelectorAll('nav ul li a');
    const tabContents = document.querySelectorAll('.tab-content');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        // Perform login validation here (e.g., check if the email and password match your database)
        if (validateLogin(email, password)) {
            authContainer.classList.add('hidden');
            appContainer.classList.remove('hidden');
        } else {
            alert('Invalid email or password');
        }
    });

    registerLink.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('register-container').classList.toggle('hidden');
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        // Perform registration validation here (e.g., save the email and password to your database)
        registerUser(email, password);
        alert('Registration successful! Please log in.');
        document.getElementById('register-container').classList.add('hidden');
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            const tabId = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // Register the service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/service-worker.js')
            .then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
    }

    // Initialize IndexedDB or any other client-side storage
    // Add functionalities for creating and managing service orders, clients and technical services
    initApp();
});

function validateLogin(email, password) {
    // Implement login validation logic (e.g., check against stored user data)
    return true; // Placeholder, replace with actual validation
}

function registerUser(email, password) {
    // Implement user registration logic (e.g., save user data to storage)
}

function initApp() {
    // Initialize app functionalities (e.g., load stored data, set up event listeners)
}