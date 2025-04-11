import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDiVVCSX3489SP50NCbU6kSbyEJHOMR4fg",
    authDomain: "crack-railway.firebaseapp.com",
    databaseURL: "https://crack-railway-default-rtdb.firebaseio.com",
    projectId: "crack-railway",
    storageBucket: "crack-railway.firebasestorage.app",
    messagingSenderId: "967453187698",
    appId: "1:967453187698:web:19295963c88d9271f6eceb",
    measurementId: "G-897L7PEK1D"
};
initializeApp(firebaseConfig);
const db = getFirestore();

// Fetch alerts from the 'history' collection
const colRef = collection(db, 'history');
getDocs(colRef)
    .then((snapshot) => {
        const alertsContainer = document.querySelector('.alert-cards'); // Select the container for alerts

        if (snapshot.empty) {
            console.log('No alerts found.');
            alertsContainer.innerHTML = '<p>No alerts available.</p>';
            return;
        }

        snapshot.docs.forEach((doc) => {
            const data = doc.data();

            // Create a div for the alert card
            const alertCard = document.createElement('div');
            alertCard.classList.add('alert-card');

            // Add the alert information
            alertCard.innerHTML = `
                <div class="alert-info">
                    <p><strong>Scale:</strong> ${data.scale}</p>
                    <p><strong>Latitude:</strong> ${data.lat}</p>
                    <p><strong>Longitude:</strong> ${data.lng}</p>
                </div>
            `;

            // Create a dot for the scale indicator
            const scaleDot = document.createElement('span');
            scaleDot.classList.add('scale-dot');
            scaleDot.style.backgroundColor =
                data.scale === 0 ? 'yellow' : data.scale === 1 ? 'orange' : 'red';

            // Append the scale dot to the alert card
            alertCard.appendChild(scaleDot);

            // Create a dropdown menu for action selection
            const actionSelect = document.createElement('select');
            actionSelect.classList.add('action-select');

            // Add options to the dropdown
            const options = ['Pending', 'Acknowledge', 'Verified'];
            options.forEach((option) => {
                const selectOption = document.createElement('option');
                selectOption.value = option.toLowerCase();
                selectOption.textContent = option;
                actionSelect.appendChild(selectOption);
            });

            // Add an event listener to handle selection changes
            actionSelect.addEventListener('change', () => {
                alert(`The following alert status: ${actionSelect.value}`);
            });

            // Append the dropdown to the alert card
            alertCard.appendChild(actionSelect);

            // Append the alert card to the container
            alertsContainer.appendChild(alertCard);
        });
    })
    .catch((error) => {
        console.error('Error fetching documents:', error);
        const alertsContainer = document.querySelector('.alert-cards');
        alertsContainer.innerHTML = '<p>Error loading alerts.</p>';
    });
