//This is the signup request
const recipeSignupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
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

        // When successful, load the homepage
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to sign up.'); // When unsuccessful, show alert
        }
    }
};

//Added event listners
const recipeSignupForm = document.querySelector('#signup-form');
if (recipeSignupForm) {
    recipeSignupForm.addEventListener('submit', recipeSignupFormHandler);
}