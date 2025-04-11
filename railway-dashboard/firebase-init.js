
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
