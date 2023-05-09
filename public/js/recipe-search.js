
const cuisineList = document.getElementById('cuisine-list');

cuisineList.addEventListener('click', async function (event) {
    const clickedListItem = event.target;


    if (clickedListItem.tagName === 'li') {
        const response = await fetch('/recipes', {
            method: 'POST',
            body: JSON.stringify({
                cuisine: clickedListItem.textContent.substring(0, clickedListItem.textContent.length - 1)
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            // Reload the page to show the new comment
            document.location.reload();
        } else {
            // Display an alert with the error message
            alert(response.statusText);
        }
    }


});