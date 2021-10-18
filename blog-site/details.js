const url = "http://localhost:8000/posts/";
const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".details");
const deleteBtn = document.querySelector(".delete");

const renderDetails = async () => {

    const resp = await fetch(url + id);
    const post = await resp.json();

    
    const template = `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
    `;

    container.innerHTML = template;
}

deleteBtn.addEventListener('click', async (e) => {
    const resp = await fetch(url + id, {
        method: 'DELETE'
    })
    window.location.replace("./index.html");
})


window.addEventListener('DOMContentLoaded', () => renderDetails());