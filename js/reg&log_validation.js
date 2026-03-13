
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
    event.preventDefault(); // prevent form from submitting and refreshing the page

    // 1.check if all validations passed
    if (validateRegistration()) {
        
        // 2. collect current user data from the form
        var currentName = document.getElementById("username").value;
        var currentEmail = document.getElementById("email").value;
        var currentPassword = document.getElementById("password").value;

        // 3. prepare user data for storage
        var userData = {
            name: currentName,
            email: currentEmail,
            password: currentPassword
        };

        // 4. attempt to register the user and get the result
        var registrationResult = registerUser(userData);

        // 5. check the registration result
        if (registrationResult.success) {
            alert(registrationResult.message); // when registration is successful, show success message
               window.location.href = "../html/home.html"; // redirect to home page after successful registration
        } else {
            // when registration fails (e.g., email already exists), show the error message
            alert(registrationResult.message); 
        }
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


/////////////////storage logic for users data////////////////////

const storage_key = 'users'; 

// فانكشن اجيب بيها بيانات المستخدمين الي عندي كلها 
function getUsers(){
    const userJson = localStorage.getItem(storage_key);
    return userJson? JSON.parse(userJson):[]; //لو لقيت داتا حولها من السترينج ولو فاضي رجع اراي فاضي
}

// لتخزين اليوزر الجديد جوا مصفوفة اليوزرز الي عندي
function saveUsers(users) {
    localStorage.setItem(storage_key, JSON.stringify(users));//عشان localStorage بتاخد سترينج بس
}



function registerUser(userData) {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'this email is already exist' };
    }
    users.push({
        name: userData.name,
        email: userData.email,
        password: userData.password
    });
    saveUsers(users);
    localStorage.setItem('currentUser', JSON.stringify(userData)); // عشان يحفظ تسجيل الدخول
    return { success: true, message: 'register successed!' };
}

function loginUser(userData) {
    const users = getUsers();
    const user = users.find(u => u.email === userData.email);
    if (!user) {
        return { success: false, message: 'user not found' };
    }
    if (user.password !== userData.password) {
        return { success: false, message: 'password is wrong ' };
    }
    return { success: true, user: { name: user.name, email: user.email } };
}