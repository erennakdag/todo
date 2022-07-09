async function getTodoList() {
  const resp = await fetch("http://localhost:3000/todos/" + userId);
  const data = await resp.json();
  return data;
}

async function addToList(userId, text, done = false) {
  const resp = await fetch("http://localhost:3000/create-todo", {
    method: "POST",
    body: JSON.stringify({ userId, text, done }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = resp.json();
  return data;
}

async function deleteFromList(id) {
  const resp = await fetch("http://localhost:3000/delete-todo/" + id, {
    method: "POST",
  });
  return resp.json();
}

let userId = window.localStorage.getItem("id");
if (!userId) {
  const CHARS = "ABCEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  console.log(id);
  window.localStorage.setItem("id", id);
  userId = id;
} else {
  console.log("mevcut");
}

// addToList(userId, "Merhaba").then(console.log);

document.getElementById("add").addEventListener("click", (e) => {
  e.preventDefault();
  console.log(userId);
  addToList(userId, document.getElementById("text").value);
  document.location.reload();
});

(async function () {
  const list = await getTodoList();
  const ul = document.getElementById("list");
  for (let item of list) {
    const li = document.createElement("li");
    li.innerHTML = `${item.text} <button id="${item.id}" type="submit">Done</button>`;
    ul.appendChild(li);
    document.getElementById(item.id).addEventListener("click", (e) => {
      e.preventDefault();
      deleteFromList(e.target.id);
      document.location.reload();
    });
  }
})();
