//Below is the logout function to send request to log out the user
const equineLogout = async () => {
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
        alert('Failed to log out.'); // When unsuccessful, show alert
    }
};

//I added an event listner to the logout button
const equineLogoutButton = document.querySelector('#equine-logout');
if (equineLogoutButton) {
    equineLogoutButton.addEventListener('click', equineLogout);
}