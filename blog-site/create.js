const url = "http://localhost:8000/posts/";
const form = document.querySelector("form");

const createPost = async (e) => {
    e.preventDefault();

    const doc = {
        title: form.heading.value,
        body: form.body.value,
        likes: 0
    }

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json'}
    });

    window.location.replace("./index.html");
}

form.addEventListener('submit', createPost)