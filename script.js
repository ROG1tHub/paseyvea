/* ======================================================
   /* ======================================================
   script.js - Carrito persistente + modal + WhatsApp
   Reemplazar TODO el contenido actual de script.js por este
   ====================================================== */

/* ---------- CONFIG (modificá el número aquí) ---------- */
const WHATSAPP_PHONE = "5492474568933"; // poner tu número sin '+' (ej: 549XXXXXXXXX)

/* ---------- NAVEGACIÓN (global) ---------- */
window.goToCategory = function(cat) {
  window.location.href = `category.html?cat=${cat}`;
};

/* ---------- DATOS DE PRODUCTOS (ejemplo) ---------- */
const products = {
  perfumes: [
    { name: "Perfume Exclusivo", desc: "Aroma floral elegante para hombres", price: 12000, oldPrice: 15000, img: "img/perfume1.jpg" },
    { name: "Aroma Mujer", desc: "Fragancia fresca y activa", price: 9000, oldPrice: null, img: "img/perfume2.jpg" }
  ],
  cremas: [
    { name: "Sweet Honesty Treasures", desc: "Desodorante Roll-On Sweet Honesty Treasures", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante1.jpg" },
    { name: "Pur Blanca", desc: "Desodorante roll-on con aroma del perfume Pur Blanca.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante2.jpg" },
    { name: "Love U", desc: "Desodorante Roll-On Love U", price: 1900, oldPrice: 3800, discount: 50, img: "img/desodorante3.jpg" },
    { name: "Toque de Amor", desc: "Desodorante Antitranspirante Roll-on", price: 2850, oldPrice: 3800, img: "img/desodorante4.jpg" },
    { name: "Sweet Honesty", desc: "Desodorante Roll-On Sweet Honesty", price: 2850, oldPrice: 3800, img: "img/desodorante5.jpg" },
    { name: "On Duty", desc: "Desodorante On Duty Care Minimizador de Vello", price: 3080, oldPrice: 5600, discount: 45, img: "img/desodorante6.jpg" }
  ],
  kids: [
     { name: "Recipiente unicornio", desc: "Lunchera para niñas", price: 5000, oldPrice: null, img: "img/kids1.jpg", fav: false },
       { name: "sábana M Kids", desc: "Estampado para niños", price: 5000, oldPrice: null, img: "img/kids2.jpg", fav: false }
  ],
  hogar: [
     { name: "Organizador Multiuso", desc: "Ideal para habitación", price: 4500, oldPrice: null, img: "img/hogar1.jpg", fav: false },
       { name: "Dispenser de jabón liquido", desc: "Ideal para cocina o baño", price: 4500, oldPrice: null, img: "img/hogar2.jpg", fav: false }
  ]
};

/* ---------- ESTADO (localStorage) ---------- */
/* cart: [{ id: "perfumes-0", category: "perfumes", index: 0, qty: 2 }, ... ] */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

/* ---------- UTILIDADES ---------- */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
function formatPrice(num) {
  return "$ " + Number(num).toLocaleString("es-AR");
}

/* ---------- BURBUJA DEL CARRITO (cantidad total) ---------- */
function updateCartBubble() {
  const bubble = document.getElementById("cart-bubble");
  if (!bubble) return;
  const totalQty = cart.reduce((s, it) => s + it.qty, 0);
  bubble.textContent = totalQty;
  bubble.style.display = totalQty > 0 ? "inline-flex" : "none";
}

/* ---------- FUNCIONES DEL CARRITO ---------- */
function findCartItem(id) {
  return cart.find(i => i.id === id);
}

function addToCart(id) {
  // id tiene formato category-index, p.ej. "cremas-2"
  const [category, idxStr] = id.split("-");
  const index = Number(idxStr);
  if (!products[category] || products[category][index] === undefined) return;

  const existing = findCartItem(id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, category, index, qty: 1 });
  }
  saveCart();
  updateCartBubble();
  // pequeña animación de feedback (opcional)
  flashCartButton();
}

function setCartQty(id, qty) {
  qty = Number(qty);
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  const item = findCartItem(id);
  if (item) {
    item.qty = qty;
    saveCart();
    updateCartBubble();
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartBubble();
}

/* ---------- RENDER DEL MODAL DEL CARRITO ---------- */
function renderCartModal() {
  const modal = document.getElementById("cart-modal");
  const list = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");
  if (!list) return;

  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<p>Tu bolsa está vacía.</p>";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  // Construir listado
  cart.forEach(item => {
    const p = products[item.category][item.index];
    const subtotal = p.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center;">
        <img src="${p.img}" alt="${p.name}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
        <div style="flex:1;">
          <strong>${p.name}</strong><br>
          <small style="color:#666;">${p.desc || ""}</small>
        </div>
        <div style="text-align:right;">
          <div>${formatPrice(p.price)}</div>
          <div style="margin-top:6px;">
            <button class="qty-btn" onclick="decreaseQty('${item.id}')">−</button>
            <span style="padding:0 8px;">${item.qty}</span>
            <button class="qty-btn" onclick="increaseQty('${item.id}')">+</button>
          </div>
        </div>
      </div>
      <div style="text-align:right;margin-top:8px;font-weight:700;">${formatPrice(subtotal)}</div>
      <div style="text-align:right;margin-top:6px;">
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Eliminar</button>
      </div>
    `;
    list.appendChild(row);
  });

  // total
  const total = cart.reduce((s, it) => {
    const p = products[it.category][it.index];
    return s + p.price * it.qty;
  }, 0);

  const totalRow = document.createElement("div");
  totalRow.style.paddingTop = "12px";
  totalRow.style.borderTop = "1px solid #eee";
  totalRow.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <strong>Total</strong>
      <strong>${formatPrice(total)}</strong>
    </div>
  `;
  list.appendChild(totalRow);

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.onclick = () => sendToWhatsApp();
  }
}

/* helpers para qty */
function increaseQty(id) {
  const item = findCartItem(id);
  if (!item) return;
  item.qty += 1;
  saveCart();
  updateCartBubble();
  renderCartModal();
}
function decreaseQty(id) {
  const item = findCartItem(id);
  if (!item) return;
  if (item.qty <= 1) {
    removeFromCart(id);
  } else {
    item.qty -= 1;
    saveCart();
  }
  updateCartBubble();
  renderCartModal();
}

/* ---------- ABRIR / CERRAR MODAL ---------- */
function openCart() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  modal.style.display = "flex";
  renderCartModal();
}
function closeCart() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  modal.style.display = "none";
}

/* cerrar al click fuera */
window.onclick = function(e) {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  if (e.target === modal) modal.style.display = "none";
};

/* ---------- FAVORITOS (simple) ---------- */
function toggleFavorite(id) {
  favorites[id] = !favorites[id];
  saveFavorites();
  // re-render products if estamos en category
  renderProductsIfNeeded();
}

/* ---------- RENDER DE PRODUCTOS (category.html) ---------- */
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get("cat"); // e.g. "cremas"

function renderProductsIfNeeded() {
  if (!currentCategory) return;
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";

  const arr = products[currentCategory] || [];
  arr.forEach((p, i) => {
    const id = `${currentCategory}-${i}`;
    const favActive = favorites[id] ? "fav-active" : "";
    container.innerHTML += `
      <div class="product-card">
        ${p.discount ? `<div class="discount-tag">-${p.discount}%</div>` : ""}
        <button class="fav-btn ${favActive}" onclick="toggleFavorite('${id}')">♥</button>
        <div class="img-wrapper" style="height:190px;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:10px;">
          <img src="${p.img}" alt="${p.name}" style="height:100%;object-fit:cover;transition:transform .35s ease;">
        </div>
        <h3>${p.name}</h3>
        <p style="color:#666">${p.desc || ""}</p>
        <div class="price-box">
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
          <div class="price">${formatPrice(p.price)}</div>
        </div>
        <button class="add-btn" onclick="addToCart('${id}')">Agregar al carrito 🛒</button>
      </div>
    `;
  });

  // pequeño efecto hover: agrego listeners para zoom (para navegadores que no usan :hover en css)
  document.querySelectorAll('.product-card .img-wrapper img').forEach(img => {
    img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.08)');
    img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
  });
}

/* ---------- WHATSAPP CHECKOUT ---------- */
function sendToWhatsApp() {
  if (!cart.length) return alert("Tu bolsa está vacía.");
  // construir mensaje
  const lines = cart.map(item => {
    const p = products[item.category][item.index];
    return `• ${p.name} x${item.qty} - ${formatPrice(p.price * item.qty)}`;
  }).join("%0A");

  const total = cart.reduce((s, it) => {
    const p = products[it.category][it.index];
    return s + p.price * it.qty;
  }, 0);

  const message = `Hola! Quiero comprar:%0A${lines}%0A%0ATotal: ${formatPrice(total)}`;
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank");
}

/* ---------- INICIALIZACIÓN AL CARGAR LA PÁGINA ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // actualizar burbuja siempre (index o category)
  updateCartBubble();

  // conectar botones modal si existen
  const openBtn = document.getElementById("open-cart");
  if (openBtn) openBtn.addEventListener("click", openCart);

  const closeBtn = document.getElementById("close-cart");
  if (closeBtn) closeBtn.addEventListener("click", closeCart);

  const checkoutBtn = document.getElementById("checkout-btn") || document.querySelector(".checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", sendToWhatsApp);

  // render category si corresponde
  if (currentCategory) {
    // setear título si existe
    const titleEl = document.getElementById("category-title");
    if (titleEl) titleEl.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

    renderProductsIfNeeded();
  }
});

/* ---------- pequeña animación / feedback al agregar ---------- */
function flashCartButton() {
  const btn = document.getElementById("open-cart");
  if (!btn) return;
  btn.animate([{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 220 });
}
