// Login form handler
const recipeLoginFormHandler = async (event) => {
    event.preventDefault();
    // Get the username and password from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        // Send a POST request to the login API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // Check if the response is successful
        if (response.ok) {
            // Redirect to the dashboard if the login request is successful
            document.location.replace('/dashboard');
        } else {
            // If the login request was unsuccessful, show an alert
            alert('Failed to log in.');
        }
    }
};

//event listner for login form
const recipeLoginForm = document.querySelector('.login-form');
if (recipeLoginForm) {
    recipeLoginForm.addEventListener('submit', recipeLoginFormHandler);
}