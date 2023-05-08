
//Below creating a new recipe 
const newRecipeFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-new-recipe').value.trim();
    const content = document.querySelector('#content-new--recipe').value.trim();

    if (title && content) {
        const response = await fetch('/api/recipes', {
            method: 'RECIPE',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // When successful, load the dashboard page
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create a new recipe.'); // When unsuccessful, show alert
        }
    }
};

//Added event listners
const newRecipeForm = document.querySelector('.new--recipe-form');
if (newRecipeForm) {
    newRecipeForm.addEventListener('submit', newRecipeFormHandler);
}