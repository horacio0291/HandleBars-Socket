const socket = io();
let products = [];
const father = document.querySelector("#realtimeproducts");

socket.on("all products", async (res) => {
  products = res;
  addProducts();
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
  });
});

const submitForm = async () => {
  const form = document.querySelector("form");
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const price = document.querySelector("#price").value;
  const img = document.querySelector("#img").value;

  // Hacer el el request con post
  await fetch("http://localhost:8080/realtimeproducts", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      thumbnails: img,
    }),
  });

  form.reset();
};

const addProducts = () => {
  const cards = products.map((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem;";

    card.innerHTML = `
      <button onclick="deleteProduct(${product.id})" class="iconTrash">
        X
      </button>
      <img src=${product.thumbnail} class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.descripction}</p>
        <p class="card-text">Price: $${product.price}</p>
        <a href="products/detail?productId=${product.id}" class="btn btn-primary">Go detail</a>
      </div>
    `;

    return card;
  });

  father.innerHTML = "";

  for (const card of cards) {
    father.appendChild(card);
  }
};
const deleteProduct = async (id) => {
  await fetch(`http://localhost:8080/realtimeproducts/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const console = () => {
  window.console.log(products);
};
