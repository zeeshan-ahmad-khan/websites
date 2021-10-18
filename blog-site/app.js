let url = "http://localhost:8000/posts";
const container = document.querySelector(".blogs");
const search = document.querySelector(".search");

const renderPosts = async (term) => {

    if (term) {
        url += `?q=${term}`;
    }

    console.log(url);
    const resp = await fetch(url);
    const posts = await resp.json();

    let template = "";

    posts.forEach((post) => {
        template += `
        <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} ❤ </small></p>
            <p>${post.body.slice(0,100)}</p>
            <a href="./details.html?id=${post.id}">...read more</a>
        </div>
     `;
    })

    container.innerHTML = template;
}

search.addEventListener('submit', (e) => {
    e.preventDefault();

    renderPosts(search.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderPosts());