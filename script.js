// Function to load and display comments
function loadComments() {
    fetch('https://raw.githubusercontent.com/llldayanlll/ok/main/comments.md?' + Date.now())
    .then(response => response.text())
    .then(data => {
        const commentsDiv = document.getElementById('comments');
        commentsDiv.innerHTML = data;
    })
    .catch(error => console.error('Error fetching comments:', error));
}

// Load comments when the page is loaded
document.addEventListener('DOMContentLoaded', loadComments);

// Form submission event listener
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the comment text from the form
    const commentText = document.getElementById('commentText').value;

    // Create the new comment in Markdown format
    const newComment = `\n\n### Comment:\n${commentText}\n`;

    // Fetch current content of the comments.md file
    fetch('https://api.github.com/repos/llldayanlll/ok/contents/comments.md', {
        headers: {
            'Authorization': 'Bearer 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'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Decode base64 content
        const currentContent = atob(data.content);

        // Append the new comment
        const newContent = currentContent + newComment;

        // Encode new content to base64
        const encodedContent = btoa(newContent);

        // Update the comments.md file with the new content
        return fetch('https://api.github.com/repos/llldayanlll/yourrepositoryname/contents/comments.md', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Add new comment',
                content: encodedContent,
                sha: data.sha
            })
        });
    })
    .then(response => {
        if (response.ok) {
            // Clear the comment input field
            document.getElementById('commentText').value = '';

            // Reload comments after adding a new comment
            loadComments();

            // Log a success message
            console.log('Comment submitted successfully.');
        } else {
            // Log an error message
            console.error('Error submitting comment:', response.status, response.statusText);
        }
    })
    .catch(error => console.error('Error:', error));
});
