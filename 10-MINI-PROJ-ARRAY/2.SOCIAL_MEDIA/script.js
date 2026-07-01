let posts = [];

function displayPosts() {
    const postFeed = document.getElementById('postFeed');
    postFeed.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
        <p><strong>Post ID:</strong> ${post.id}</p>
        <p>${post.content}</p>
        <p><strong>Likes:</strong> ${post.likes}</p>
        <p><strong>Comments:</strong></p>
        ${post.comments.length > 0
                ? post.comments.map(comment => `<p class="comment">- ${comment}</p>`).join('')
                : '<p class="comment">No comments yet</p>'}
        <div class="actions">
          <button onclick="likePost(${post.id})">Like</button>
          <button onclick="editPost(${post.id})">Edit</button>
          <button onclick="addComment(${post.id})">Add Comment</button>
          <button onclick="clonePost(${post.id})">Clone</button>
        </div>
      `;
        postFeed.appendChild(postDiv);
    });
}

function addPost() {
    const content = document.getElementById('newPostContent').value.trim();
    if (content === '') {
        alert('Post content cannot be empty!');
        return;
    }
    const newPost = { id: posts.length + 1, content, likes: 0, comments: [] };
    posts.push(newPost);
    displayPosts();
    document.getElementById('newPostContent').value = '';
}

function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    const newContent = prompt('Edit Post Content:', post.content);
    if (newContent && newContent.trim() !== '') {
        post.content = newContent;
        displayPosts();
    }
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    post.likes++;
    displayPosts();
}

function addComment(postId) {
    const comment = prompt('Enter your comment:');
    if (comment && comment.trim() !== '') {
        const post = posts.find(p => p.id === postId);
        post.comments.push(comment);
        displayPosts();
    }
}

function searchPosts(keyword) {
    const results = posts.filter(post => post.content.includes(keyword));
    if (results.length > 0) {
        alert(`Found ${results.length} post(s) matching "${keyword}"`);
        console.log(results);
    } else {
        alert('No posts match your search!');
    }
}

function clonePost(postId) {
    const postToClone = posts.find(p => p.id === postId);
    if (postToClone) {
        const clonedPost = { ...postToClone, id: posts.length + 1, likes: 0, comments: [] };
        posts.push(clonedPost);
        displayPosts();
    }
}

function checkComments() {
    const hasComments = posts.some(post => post.comments.length > 0);
    alert(hasComments ? 'Some posts have comments' : 'No posts have comments');
}

function validatePosts() {
    const allValid = posts.every(post => post.content.trim() !== '' && typeof post.likes === 'number');
    alert(allValid ? 'All posts are valid' : 'Some posts are invalid');
}

function sortPostsByLikes() {
    posts.sort((a, b) => b.likes - a.likes);
    displayPosts();
}

displayPosts();
