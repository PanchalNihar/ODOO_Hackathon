document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();
    var errorMessage = document.getElementById('error-message');

    // Basic validation
    if (username === '' || password === '') {
        errorMessage.textContent = 'Please enter both username and password.';
        return;
    }else{
        if(username=='admin' && password=='123456'){
            alert("Login successful!");
            // window.location.href = 'dashboard.html';
        }else{
            alert("Login unsuccessful!");

        }
    }

    errorMessage.textContent = '';

    // Simulate login logic (replace with actual authentication)
    // For demonstration, show an alert with the entered credentials

    });
