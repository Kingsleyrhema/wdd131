// ---------- Data ----------
// note: images/xxx.jpg should exist in your repo; use Unsplash placeholders if needed.
const products = [
  {
    id: 1,
    name: "Bamboo Utensil Set",
    desc: "Durable & plastic-free kitchen essentials.",
    price: 12.99,
    img: "images/bambo.jpg"
  },
  {
    id: 2,
    name: "Reusable Produce Bags",
    desc: "Breathable cotton mesh bags (set of 5).",
    price: 8.50,
    img: "images/bag.webp"
  },
  {
    id: 3,
    name: "Silicone Food Wraps",
    desc: "Replace cling film with flexible silicone.",
    price: 15.00,
    img: "images/silicon.jpg"
  },
  {
    id: 4,
    name: "Compostable Dish Sponges",
    desc: "Plant-based, 100 % biodegradable sponges.",
    price: 6.75,
    img: "images/sponge.webp"
  },
  {
    id: 5,
    name: "Stainless Steel Straw Pack",
    desc: "Eight bent & straight straws + brushes.",
    price: 9.25,
    img: "images/straw.webp"
  },
  {
    id: 6,
    name: "Bamboo Toothbrush Pack",
    desc: "Family pack of 4 soft-bristle brushes.",
    price: 7.80,
    img: "images/brush.jpg"
  }
];


// ---------- Local Storage Helpers ----------
let cart = JSON.parse(localStorage.getItem("ecocart")) || [];
function saveCart() { localStorage.setItem("ecocart", JSON.stringify(cart)); }
function updateNavCount() {
  const els = document.querySelectorAll("#nav-cart-count");
  els.forEach(el => { el.textContent = cart.length; });
}

// ---------- Product Page ----------
function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";
  products.forEach(p => {
    const inCart = cart.some(item => item.id === p.id);
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="price">$${p.price.toFixed(2)}</p>
      <button ${inCart ? "disabled" : ""} data-id="${p.id}">
        ${inCart ? "In Cart ✔" : "Add to Cart"}
      </button>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      addToCart(id);
      btn.disabled = true;
      btn.textContent = "In Cart ✔";
    });
  });
}

// ---------- Cart Logic ----------
function addToCart(productId) {
  const exists = cart.find(item => item.id === productId);
  if (exists) return;
  const prod = products.find(p => p.id === productId);
  cart.push({ ...prod, quantity: 1 });
  saveCart();
  updateNavCount();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateNavCount();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  updateNavCount();
  renderCart();
}

function renderCart() {
  const table = document.getElementById("cart-table");
  const emptyMsg = document.getElementById("cart-empty");
  const clearBtn = document.getElementById("clear-cart");
  if (!table || !emptyMsg) return;

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  let grand = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");
    const total = item.price * item.quantity;
    grand += total;
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>
      <td><button data-remove="${item.id}">✖</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("grand-total").textContent = `$${grand.toFixed(2)}`;

  // Toggle visibility
  const hasItems = cart.length > 0;
  table.hidden = !hasItems;
  clearBtn.hidden = !hasItems;
  emptyMsg.hidden = hasItems;

  // Remove handlers
  tbody.querySelectorAll("button[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(parseInt(btn.dataset.remove, 10)));
  });
}

// ---------- Order Tracking ----------
function trackOrder(orderId, email) {
  if (orderId === "EC123" && email.endsWith("@example.com")) {
    return `Order <strong>${orderId}</strong> is <strong>In Transit</strong>.`;
  }
  return `No order found for ID <strong>${orderId}</strong>.`;
}

// ---------- DOM Ready ----------
document.addEventListener("DOMContentLoaded", () => {
  updateNavCount();
  renderProducts();
  renderCart();

  // Form handler
  const form = document.getElementById("track-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const id = document.getElementById("orderId").value.trim();
      const em = document.getElementById("email").value.trim();
      const result = trackOrder(id, em);
      document.getElementById("track-result").innerHTML = result;
      form.reset();
    });
  }

  // Hamburger toggle
  const toggle = document.getElementById("nav-toggle");
  const nav    = document.querySelector("header nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }

  // Clear cart button
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);
});
