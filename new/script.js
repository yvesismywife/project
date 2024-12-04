ocument.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username-input');
    const commentInput = document.getElementById('comment-input');
    const postIdInput = document.getElementById('post-id'); // Get the post ID for the current post
    const submitComment = document.getElementById('submit-comment');
    const commentSection = document.getElementById('comment-section');

    // Load comments for a specific post from local storage
    function loadComments(postId) {
        const comments = JSON.parse(localStorage.getItem('comments')) || {};
        const postComments = comments[postId] || [];
        commentSection.innerHTML = postComments.map(comment => `
                <div class="comment mb-3 p-3 border rounded">
                    <span class="username"><i class="fa-solid fa-user"></i> ${comment.username}</span><hr>
                    <p>${comment.text}</p>
                </div>
            `).join('');
    }

    // Save a comment with the post ID to local storage
    function saveComment(username, text, postId) {
        const comments = JSON.parse(localStorage.getItem('comments')) || {};
        comments[postId] = comments[postId] || [];
        comments[postId].push({ username, text });
        localStorage.setItem('comments', JSON.stringify(comments));
    }d

    // Add a new comment for the specific post
    function addComment() {
        const username = usernameInput.value.trim();
        const text = commentInput.value.trim();
        const postId = postIdInput.value; // Get the current post ID
        if (username && text) {
            saveComment(username, text, postId);
            usernameInput.value = ''; // Clear the username input field
            commentInput.value = ''; // Clear the comment input field
            loadComments(postId); // Reload comments for the current post
        }
        else {
            alert("Please enter your name and comment");
        }
    }

    // Event listener for the submit button
    submitComment.addEventListener('click', addComment);

    // Load comments for the current post when the page loads
    const currentPostId = postIdInput.value;
    loadComments(currentPostId);
});