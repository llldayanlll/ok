document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value;

    fetch('https://api.github.com/repos/llldayanlll/ok/issues', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'New Comment',
            body: commentText
        })
    })
    .then(response => response.json())
    .then(data => {
        // Clear the comment input field
        document.getElementById('commentText').value = '';
        
        // Display the new comment immediately
        displayComment(commentText);
    })
    .catch(error => console.error('Error:', error));
});

function loadComments() {
    fetch('https://api.github.com/repos/llldayanlll/ok/issues')
    .then(response => response.json())
    .then(data => {
        const commentsDiv = document.getElementById('comments');
        commentsDiv.innerHTML = '';

        data.forEach(issue => {
            displayComment(issue.body);
        });
    })
    .catch(error => console.error('Error:', error));
}

function displayComment(commentText) {
    const commentsDiv = document.getElementById('comments');
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <h3>Comment:</h3>
        <p>${commentText}</p>
    `;
    commentsDiv.appendChild(commentDiv);
}

window.addEventListener('load', loadComments);
