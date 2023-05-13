// Signup form handler
const recipeSignupFormHandler = async (event) => {
    event.preventDefault();
    // Get the username and password from the signup form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    // Check if both username and password are provided
    if (username && password) {
        // Send a POST request to the signup API endpoint
        const response = await fetch('/api/users/signup', {
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
            // Redirect to the dashboard if the signup request is successful
            document.location.replace('/dashboard');
        } else {
            // If the signup request was unsuccessful, show an alert
            alert('Failed to sign up.');
        }
    }
};

//Added event listners
const recipeSignupForm = document.querySelector('#signup-form');
if (recipeSignupForm) {
    recipeSignupForm.addEventListener('submit', recipeSignupFormHandler);
}