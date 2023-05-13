//Below is the logout function to send request to log out the user
const recipeLogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // When successful, load the homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        // When unsuccessful, show alert
        alert('Failed to log out.');
    }
};

//event listner to the logout 
const recipeLogoutButton = document.querySelector('#recipe-logout');
if (recipeLogoutButton) {
    recipeLogoutButton.addEventListener('click', recipeLogout);
}