// Handler function for recipe  login form submission
const recipeLoginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-recipe-login').value.trim();
    const password = document.querySelector('#password-recipe-login').value.trim();

    if (username && password) {
        // Below I am sending a RECIPE request to the login endpoint with the input values as JSON data
        const response = await fetch('/api/users/login', {
            method: 'Recipe',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            // If the request was unsuccessful, show an alert
            alert('Failed to log in.');
        }
    }
};

//Below is the event listner for the recipe login form
const recipeLoginForm = document.querySelector('.recipe-login-form');
if (recipeLoginForm) {
    recipeLoginForm.addEventListener('submit', recipeLoginFormHandler);
}