//Below I added an event listener for deleting recipes 

const deleteRecipe = async (recipe_id) => {
  const response = await fetch(`/api/recipes/${recipe_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to delete the recipe.");
  }
};

const deleteRecipeHandler = (event) => {
  if (event.target.matches(".delete-recipe")) {
    const recipe_id = event.target.getAttribute("data-recipe-id");
    deleteRecipe(recipe_id);
  }
};

document.addEventListener("click", deleteRecipeHandler);