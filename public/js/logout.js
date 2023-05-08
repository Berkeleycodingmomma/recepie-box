//Below is the logout function to send request to log out the user
const recipeLogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'RECIPE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // When successful, load the homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.'); // When unsuccessful, show alert
    }
};

//I added an event listner to the logout button
const recipeLogoutButton = document.querySelector('#recipe-logout');
if (recipeLogoutButton) {
    recipeLogoutButton.addEventListener('click', recipeLogout);
}