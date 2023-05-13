// Handler for choosing cuisine
async function chooseCusineHandler(event) {
    const clickedListItem = event.target;
    //remove the emoji
    words = clickedListItem.textContent.split(" ");
    let cuisine;
    if (words.length > 2) {
        cuisine = words[0] + " " + words[1];
    }
    else {
        cuisine = words[0];
    }
    // Check if the clicked element is an LI (list item)
    if (clickedListItem.tagName === 'LI') {
        const response = await fetch(`/recipes/${cuisine}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // Check if the response is successful
        if (response.ok) {
            document.location.replace(`/recipes/${cuisine}`);
        } else {
            // Display an alert with the error message
            alert(response.statusText);
        }
    }
}


const cuisineList = document.getElementById('cuisine-list');
if (cuisineList) {
    cuisineList.addEventListener('click', chooseCusineHandler);
}
