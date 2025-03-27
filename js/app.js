document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerLink = document.getElementById('show-register');
    const registerForm = document.getElementById('register-form');
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    const tabs = document.querySelectorAll('nav ul li a');
    const tabContents = document.querySelectorAll('.tab-content');
    const orderFormContainer = document.getElementById('order-form-container');
    const clientFormContainer = document.getElementById('client-form-container');
    const serviceFormContainer = document.getElementById('service-form-container');

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

    document.getElementById('add-order').addEventListener('click', () => {
        orderFormContainer.classList.remove('hidden');
    });

    document.getElementById('cancel-order').addEventListener('click', () => {
        orderFormContainer.classList.add('hidden');
    });

    document.getElementById('order-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const description = document.getElementById('order-description').value;
        addOrder({ description });
        orderFormContainer.classList.add('hidden');
        loadOrders();
    });

    document.getElementById('add-client').addEventListener('click', () => {
        clientFormContainer.classList.remove('hidden');
    });

    document.getElementById('cancel-client').addEventListener('click', () => {
        clientFormContainer.classList.add('hidden');
    });

    document.getElementById('client-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('client-name').value;
        addClient({ name });
        clientFormContainer.classList.add('hidden');
        loadClients();
    });

    document.getElementById('add-service').addEventListener('click', () => {
        serviceFormContainer.classList.remove('hidden');
    });

    document.getElementById('cancel-service').addEventListener('click', () => {
        serviceFormContainer.classList.add('hidden');
    });

    document.getElementById('service-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('service-name').value;
        addService({ name });
        serviceFormContainer.classList.add('hidden');
        loadServices();
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
    loadOrders();
    loadClients();
    loadServices();
}

function loadOrders() {
    getOrders((orders) => {
        const ordersList = document.getElementById('orders-list');
        ordersList.innerHTML = '';
        orders.forEach(order => {
            const li = document.createElement('li');
            li.textContent = order.description;
            ordersList.appendChild(li);
        });
    });
}

function loadClients() {
    getClients((clients) => {
        const clientsList = document.getElementById('clients-list');
        clientsList.innerHTML = '';
        clients.forEach(client => {
            const li = document.createElement('li');
            li.textContent = client.name;
            clientsList.appendChild(li);
        });
    });
}

function loadServices() {
    getServices((services) => {
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';
        services.forEach(service => {
            const li = document.createElement('li');
            li.textContent = service.name;
            servicesList.appendChild(li);
        });
    });
}
