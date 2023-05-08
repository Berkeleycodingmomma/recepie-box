
//Below creating a new post 
const newEquinePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-new-equine-post').value.trim();
    const content = document.querySelector('#content-new-equine-post').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
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
            alert('Failed to create a new post.'); // When unsuccessful, show alert
        }
    }
};

//Added event listners
const newEquinePostForm = document.querySelector('.new-equine-post-form');
if (newEquinePostForm) {
    newEquinePostForm.addEventListener('submit', newEquinePostFormHandler);
}