async function addToFavesHandler() {

    const spoon_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    let calories;
    // Select all <li> elements within the <ul> by using a CSS selector
    const table = document.getElementById("dish-nutr");

    // Get all the rows in the table body
    const rows = table.getElementsByTagName("tr");

    // Loop through the rows
    for (var i = 1; i < rows.length; i++) {
        const nameColumn = rows[i].getElementsByTagName("td")[0];
        const amountColumn = rows[i].getElementsByTagName("td")[1];

        // Check if the name matches the desired name
        if (nameColumn.textContent === "Calories") {
            // Get the value from the "Amount" column
            calories = amountColumn.textContent;
            break; // Exit the loop since we found the desired row
        }
    }
    // if for some reason this information was not fetched from Spoonacular for somereason, just set it to null;
    if (!calories) {
        calories = null;
    }
    // Get the name and picture source from the HTML elements
    const name = document.getElementById('dish-title').textContent;
    const picture_source = document.getElementById('dish-pic').src;
    // Send a POST request to the API endpoint with the recipe data
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
    // Check if the response is successful
    if (response.ok) {
        // Redirect to the dashboard if the request is successful
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
