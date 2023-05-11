async function deleteHandler(event) {
  if (event.target.classList.contains("remove-button")) {
    const clickbutton = event.target;
    const spoon_id = clickbutton.getAttribute("data-id");
   
     
    const response = await fetch(`/api/recipes/${spoon_id}`, {
      method: "DELETE",
      body: JSON.stringify({
        spoon_id: spoon_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response body as JSON
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
