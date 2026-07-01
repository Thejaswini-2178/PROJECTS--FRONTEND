const socialMediaApp = {
    posts: [],

    // Add a new post
    addPost(content) {
        const newPost = {
            id: Date.now(), // Unique ID based on timestamp
            content,
            likes: 0,
            comments: [],
            date: new Date(),
        };
        this.posts.push(newPost);
    },

    // Edit an existing post
    editPost(postId, newContent) {
        const post = this.posts.find((p) => p.id === postId);
        if (post) post.content = newContent;
    },

    // Like a post
    likePost(postId) {
        const post = this.posts.find((p) => p.id === postId);
        if (post) post.likes++;
    },

    // Add a comment to a post
    addComment(postId, comment) {
        const post = this.posts.find((p) => p.id === postId);
        if (post) post.comments.push(comment);
    },

    // Clone a post
    clonePost(postId) {
        const post = this.posts.find((p) => p.id === postId);
        if (post) {
            const clonedPost = { ...post, id: Date.now(), date: new Date() };
            this.posts.push(clonedPost);
        }
    },

    // Render all posts
    renderPosts() {
        const container = document.getElementById("postsContainer");
        container.innerHTML = ""; // Clear existing posts

        this.posts.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.className = "bg-white p-4 rounded shadow";

            postDiv.innerHTML = `
          <p class="text-lg">${post.content}</p>
          <div class="mt-4 flex justify-between items-center">
            <span>${post.likes} Likes</span>
            <button
              class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              onclick="socialMediaApp.likePost(${post.id}); socialMediaApp.renderPosts();"
            >
              Like
            </button>
            <button
              class="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              onclick="editPostPrompt(${post.id})"
            >
              Edit
            </button>
            <button
              class="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
              onclick="socialMediaApp.clonePost(${post.id}); socialMediaApp.renderPosts();"
            >
              Clone
            </button>
          </div>
        `;

            container.appendChild(postDiv);
        });
    },
};

// Prompt user for editing a post
function editPostPrompt(postId) {
    const post = socialMediaApp.posts.find((p) => p.id === postId);
    if (post) {
        const newContent = prompt("Edit your post:", post.content);
        if (newContent) {
            socialMediaApp.editPost(postId, newContent);
            socialMediaApp.renderPosts();
        }
    }
}
// Handle the Add Post form submission
document.getElementById("addPostForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const content = document.getElementById("postContent").value;
    socialMediaApp.addPost(content);
    socialMediaApp.renderPosts();
    e.target.reset(); // Clear the form
});
