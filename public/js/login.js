// Handler function for recipe  login form submission
const recipeLoginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(username);
    console.log(password);
    if (username && password) {
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

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            // If the request was unsuccessful, show an alert
            alert('Failed to log in.');
        }
    }
};

//Below is the event listner for the recipe login form
const recipeLoginForm = document.querySelector('.login-form');
if (recipeLoginForm) {
    recipeLoginForm.addEventListener('submit', recipeLoginFormHandler);
}