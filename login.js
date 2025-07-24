function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var error = document.getElementById("error");

    var validUsername = "admin";
    var validPassword = "1234";

    if (username === validUsername && password === validPassword) {
        alert("Login successful!");
    } else {
        error.textContent = "Invalid username or password.";
    }

    return false; // prevent form from submitting
}
