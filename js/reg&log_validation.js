
function validateUsername() {
    var username = document.getElementById("username").value;
    const usernamePattern = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
    if (!username) {
        alert("Please enter your full name.");
        return false;
    }
    if(!usernamePattern.test(username)) {
        alert("Username can only contain letters and spaces.");
        return false;
    }
    return true;
}

function validateEmail() {
    var email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        alert("Please enter your email address.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

function validatePassword() {
    var password = document.getElementById("password").value;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{8,}$/;
    if (!password) {
        alert("Please enter a password.");
        return false;
    }
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters long and contain at least one letter, one number, and one special character.");
        return false;
    }
    return true;
}
function validateConfirmPassword() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;
    if (!confirmPassword) {
        alert("Please confirm your password.");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop the form from refreshing the page
    
    // Call the validation
    if (validateRegistration()) {
        // If it returns true, manually move to the home page
        window.location.href = "../html/home.html"; 
    }
});

function validateRegistration() {
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateUsername();
    if (!validateUsername()) return false;
    if (!validateEmail()) return false;
    if (!validatePassword()) return false;
    if (!validateConfirmPassword()) return false;

    return true; // Everything passed!
}

