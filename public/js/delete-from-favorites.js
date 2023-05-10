async function deleteHandler() {

    const spoon_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1].split("_")[0];
    const response = await fetch(`/api/recipes/${spoon_id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            spoon_id: spoon_id
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        console.log(data);
        document.location.replace('/dashboard');
    } else {
        // Display an alert with the error message
        alert(response.statusText);
    }
}




const deleteFromFavorites = document.getElementById('delete-from-favorites');
if (deleteFromFavorites) {
    deleteFromFavorites.addEventListener('click', deleteHandler);
}
