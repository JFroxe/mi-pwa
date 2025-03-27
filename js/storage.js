const DB_NAME = 'pwa_service_orders';
const DB_VERSION = 1;
let db;

document.addEventListener('DOMContentLoaded', () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
        console.error('Database error:', event.target.errorCode);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log('Database opened successfully');
        loadStoredData();
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;

        if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users', { keyPath: 'email' });
        }

        if (!db.objectStoreNames.contains('orders')) {
            db.createObjectStore('orders', { autoIncrement: true });
        }

        if (!db.objectStoreNames.contains('clients')) {
            db.createObjectStore('clients', { autoIncrement: true });
        }

        if (!db.objectStoreNames.contains('services')) {
            db.createObjectStore('services', { autoIncrement: true });
        }
    };
});

function loadStoredData() {
    // Load stored data from IndexedDB and populate the UI
}

function addOrder(order) {
    const transaction = db.transaction(['orders'], 'readwrite');
    const store = transaction.objectStore('orders');
    store.add(order);
}

function addClient(client) {
    const transaction = db.transaction(['clients'], 'readwrite');
    const store = transaction.objectStore('clients');
    store.add(client);
}

function addService(service) {
    const transaction = db.transaction(['services'], 'readwrite');
    const store = transaction.objectStore('services');
    store.add(service);
}

function getOrders(callback) {
    const transaction = db.transaction(['orders'], 'readonly');
    const store = transaction.objectStore('orders');
    const request = store.getAll();

    request.onsuccess = (event) => {
        callback(event.target.result);
    };
}

function getClients(callback) {
    const transaction = db.transaction(['clients'], 'readonly');
    const store = transaction.objectStore('clients');
    const request = store.getAll();

    request.onsuccess = (event) => {
        callback(event.target.result);
    };
}

function getServices(callback) {
    const transaction = db.transaction(['services'], 'readonly');
    const store = transaction.objectStore('services');
    const request = store.getAll();

    request.onsuccess = (event) => {
        callback(event.target.result);
    };
}
