const newRecipeCommentFormHandler = async (event) => {
    event.preventDefault();

    const recipe_id = parseInt(window.location.pathname.split('/').pop());

    const content = document.querySelector('#content-new-recipe-comment').value.trim();

    if (content) {
        const response = await fetch(`/api/comments`, {
            method: 'RECIPE',
            body: JSON.stringify({
                comment_text: content,
                recipe_id
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.reload(); // When successful, reload the same page
        } else {
            console.log('Response status:', response.status);
            console.log('Response text:', await response.text());
            alert('Failed to create a comment.'); // When unsuccessful, show alert
        }
    }
};

//Below is the event listners
const newRecipeCommentForm = document.querySelector('.new-recipe-comment-form');
if (newRecipeCommentForm) {

    newRecipeCommentForm.addEventListener('submit', newRecipeCommentFormHandler);
}