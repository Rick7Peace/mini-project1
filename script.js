// 🌞 Theme Toggle with Local Storage

// Get references to the theme toggle button and the <body> element
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Check if the user previously selected "dark" mode and stored it in localStorage
if (localStorage.getItem("theme") === "dark") {
  // If yes, apply dark mode styling by adding the "dark" class to <body>
  body.classList.add("dark");
  // Change button icon to moon
  toggleBtn.textContent = "🌙";
}

// Add event listener for when the user clicks the theme toggle button
toggleBtn.addEventListener("click", () => {
  // Toggle dark mode on and off by adding/removing the "dark" class
  body.classList.toggle("dark");
  
  // Determine which theme is active after toggling
  const theme = body.classList.contains("dark") ? "dark" : "light";
  
  // Save the user's theme preference in localStorage
  localStorage.setItem("theme", theme);
  
  // Update button icon depending on the active theme
  toggleBtn.textContent = theme === "dark" ? "🌙" : "🌞";
});



// 💾 Save Form Data in Local Storage

// Get references to the contact form and message display area
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

// Add an event listener to handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the page from reloading after form submission
  
  // Get input values from the form fields
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Save the form data to localStorage
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  // Display a thank-you message to the user
  message.textContent = `Thank you, ${name}! We’ll reach out soon 🌸`;

  // Reset the form fields
  form.reset();
});



// 🎵 Music Player

// Get references to the <audio> element and the play/pause button
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false; // Track whether music is currently playing

// Add event listener for play/pause button
musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // Start playing music at 30% volume
    music.volume = 0.3;
    music.play();
    // Update button text to show "Pause"
    musicBtn.textContent = "Pause Music ⏸️";
    isPlaying = true;
  } else {
    // Pause the music
    music.pause();
    // Update button text to show "Play"
    musicBtn.textContent = "Play Music 🎧";
    isPlaying = false;
  }
});



// 🧘 Authentication with Local Storage

// Get references to all authentication-related elements
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const signupSection = document.getElementById("signup-section");
const loginSection = document.getElementById("login-section");
const welcomeSection = document.getElementById("welcome-section");
const welcomeMessage = document.getElementById("welcomeMessage");

// Check if a user is already logged in (session persistence)
let currentUser = localStorage.getItem("currentUser");
if (currentUser) {
  // If so, show the welcome section
  showWelcome(JSON.parse(currentUser).name);
}



// 🪷 Sign Up

signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload on submit
  
  // Get user input from the sign-up form
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  // Create a user object
  const user = { name, email, password };

  // Save user data in localStorage (in real apps, never store plain passwords)
  localStorage.setItem("user", JSON.stringify(user));

  // Notify the user and show login section
  alert("Sign up successful! Please log in.");
  signupForm.reset();
  signupSection.style.display = "none";
  loginSection.style.display = "block";
});



// 🔐 Log In

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Get email and password from login form
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Retrieve the saved user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Check if credentials match
  if (storedUser && storedUser.email === email && storedUser.password === password) {
    // Save the logged-in user as current session
    localStorage.setItem("currentUser", JSON.stringify(storedUser));
    showWelcome(storedUser.name);
  } else {
    // If no match, show error
    alert("Invalid credentials. Try again.");
  }
});



// 🚪 Log Out

logoutBtn.addEventListener("click", () => {
  // Remove user session data
  localStorage.removeItem("currentUser");

  // Hide welcome section and show login section again
  welcomeSection.style.display = "none";
  loginSection.style.display = "block";
});



// 🌿 Function to Show Welcome Screen

function showWelcome(name) {
  // Hide signup and login sections
  signupSection.style.display = "none";
  loginSection.style.display = "none";

  // Show the welcome message section
  welcomeSection.style.display = "block";
  welcomeMessage.textContent = `Welcome back, ${name}! 🌿`;
}
