/* ======================================================
   🔗 NAVEGACIÓN A CATEGORÍAS
====================================================== */
window.goToCategory = function(cat) {
    window.location.href = `category.html?cat=${cat}`;
};

/* ======================================================
   🛒 BASE DE DATOS SIMPLIFICADA DE PRODUCTOS
====================================================== */
const products = {
    perfumes: [
        { name: "Perfume Exclusivo", desc: "Aroma floral elegante", price: 12000, oldPrice: 15000, img: "img/perfumes.jpg", fav: false },
        { name: "Aroma Sport", desc: "Fragancia fresca y activa", price: 9000, oldPrice: null, img: "img/perfume2.jpg", fav: false }
    ],
    cremas: [
        { name: "Sweet Honesty Treasures", desc: "Desodorante Roll-On Sweet Honesty Treasures", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante1.jpg", fav: false },
        { name: "Pur Blanca", desc: "Desodorante roll-on con aroma del perfume Pur Blanca.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante2.jpg", fav: false },
        { name: "Love U", desc: "Desodorante Roll-On Love U", price: 1900, oldPrice: 3800, discount: 50, img: "img/desodorante3.jpg", fav: false },
        { name: "Toque de Amor", desc: "Desodorante Antitranspirante Roll-on", price: 2850, oldPrice: 3800, img: "img/desodorante4.jpg", fav: false },
        { name: "Sweet Honesty", desc: "Desodorante Roll-On Sweet Honesty", price: 2850, oldPrice: 3800, img: "img/desodorante5.jpg", fav: false },
        { name: "On Duty", desc: "Desodorante On Duty Care Minimizador de Vello", price: 3080, oldPrice: 5600, discount: 45, img: "img/desodorante6.jpg", fav: false },
    ],
    kids: [
        { name: "Colonia Kids", desc: "Aroma suave para niños", price: 5000, oldPrice: null, img: "img/kids.jpg", fav: false }
    ],
    hogar: [
        { name: "Organizador Multiuso", desc: "Ideal para cocina o baño", price: 4500, oldPrice: null, img: "img/hogar.jpg", fav: false }
    ]
};

/* ======================================================
   📌 DETECTAR CATEGORÍA ACTUAL
====================================================== */
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get("cat");

/* ======================================================
   🧡 FAVORITOS + 🛒 CARRITO
====================================================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

updateCartBubble();

/* ======================================================
   🖼 RENDER DE PRODUCTOS (CATEGORY.HTML)
====================================================== */
function renderProducts(category) {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "";

    products[category].forEach((p, index) => {
        const id = `${category}-${index}`;
        const favActive = favorites[id] ? "fav-active" : "";

        container.innerHTML += `
            <div class="product-card">

                ${p.discount ? `<div class="discount-tag">-${p.discount}%</div>` : ""}

                <button class="fav-btn ${favActive}" onclick="toggleFavorite('${id}')">♥</button>

                <img src="${p.img}" alt="${p.name}">

                <h3>${p.name}</h3>
                <p>${p.desc}</p>

                <div class="price-box">
                    ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ""}
                    <span class="price">$${p.price}</span>
                </div>

                <button class="add-btn" onclick="addToCart('${id}')">Agregar al carrito 🛒</button>
            </div>
        `;
    });
}

if (currentCategory) renderProducts(currentCategory);

/* ======================================================
   🧡 FAVORITOS
====================================================== */
function toggleFavorite(id) {
    favorites[id] = !favorites[id];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderProducts(currentCategory);
}

/* ======================================================
   🛒 CARRITO
====================================================== */
function addToCart(id) {
    const [cat, index] = id.split("-");
    const product = products[cat][index];

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBubble();
}

function updateCartBubble() {
    const bubble = document.getElementById("cart-bubble");
    if (bubble) bubble.textContent = cart.length;
}

/* ======================================================
   🛍 MODAL DEL CARRITO
====================================================== */
const modal = document.getElementById("cart-modal");
const closeBtn = document.getElementById("close-cart");

window.openCart = function() {
    modal.style.display = "flex";
    renderCartItems();
};

function renderCartItems() {
    const box = document.getElementById("cart-items");
    box.innerHTML = "";

    cart.forEach((item) => {
        box.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                $${item.price}
            </div>
        `;
    });
}

if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

/* ======================================================
   🌙 MODO OSCURO UNIFICADO (SIMPLE + SIN ERRORES)
====================================================== */
const darkToggle = document.getElementById("darkToggle");

// Cargar preferencia guardada
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.checked = true;
}

// Evento del switch
if (darkToggle) {
    darkToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", darkToggle.checked);
    });
}
