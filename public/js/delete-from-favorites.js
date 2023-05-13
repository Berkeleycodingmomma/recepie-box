
// Handler for the delete event
async function deleteHandler(event) {
  // Check if the clicked element has the "remove-button" class
  if (event.target.classList.contains("remove-button")) {
    const clickbutton = event.target;
    const spoon_id = clickbutton.getAttribute("data-id");

    // Send a DELETE request to the API endpoint with the spoon_id
    const response = await fetch(`/api/recipes/${spoon_id}`, {
      method: "DELETE",
      body: JSON.stringify({
        spoon_id: spoon_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Check if the response is successful
    if (response.ok) {
      // Parse the response body as JSON
      const data = await response.json(); // Parse the response body as JSON
      // Redirect to the dashboard if the request is successful
      document.location.replace("/dashboard");
    } else {
      // Display an alert with the error message
      alert(response.statusText);
    }
  }
}

const deleteFromFavorites = document.getElementById("recipes-container");
if (deleteFromFavorites) {
  deleteFromFavorites.addEventListener("click", deleteHandler);
}
