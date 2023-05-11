async function addToFavesHandler() {

    const spoon_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1].split("_")[0];
    let calories;
    // Select all <li> elements within the <ul> by using a CSS selector
    var listItems = document.querySelectorAll('#dish_nutr li');

    // Loop through the list items
    for (var i = 0; i < listItems.length; i++) {
        let listItem = listItems[i].textContent.trim();
        listItemName = listItem.split(" ")[0];
        // Check if the content of the list item matches the desired content
        if (listItemName === 'Calories') {
            calories = listItem.split(" ")[1];
            break; // Exit the loop since we found the desired item
        }
    }
    if (!calories) {
        calories = null;
    }
    const name = document.getElementById('dish_title').textContent;
    const picture_source = document.getElementById('dish_pick').src;

    const response = await fetch(`/api/recipes/`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            calories,
            picture_source,
            spoon_id
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // Display an alert with the error message
        alert(response.statusText);
    }
}




const addToFavorites = document.getElementById('add-to-favorites');
if (addToFavorites) {
    addToFavorites.addEventListener('click', addToFavesHandler);
}
