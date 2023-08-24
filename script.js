function loadComments() {
    fetch('https://raw.githubusercontent.com/llldayanlll/yourrepositoryname/main/comments.md?' + Date.now())

    .then(response => response.text())
    .then(data => {
        const commentsDiv = document.getElementById('comments');
        commentsDiv.innerHTML = data; // Render raw markdown content
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', loadComments);

document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value;

    // Create the new comment in Markdown format
    const newComment = `\n\n### Comment:\n${commentText}\n`;

    // Append the new comment to the comments.md file
    fetch('https://api.github.com/repos/llldayanlll/ok/contents/comments.md', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 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'
        }
    })
    .then(response => response.json())
    .then(data => {
        const currentContent = atob(data.content); // Decode base64 content
        const newContent = currentContent + newComment;

        return fetch('https://api.github.com/repos/llldayanlll/ok/contents/comments.md', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Add new comment',
                content: btoa(newContent), // Encode new content to base64
                sha: data.sha // Commit SHA
            })
        });
    })
    .then(response => {
        if (response.ok) {
            // Reload comments after adding a new comment
            loadComments();
            // Clear the comment input field
            document.getElementById('commentText').value = '';
        }
    })
    .catch(error => console.error('Error:', error));
});
