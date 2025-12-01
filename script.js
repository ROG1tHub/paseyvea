/* ---------- CONFIG: tu número WhatsApp ---------- */
const WHATSAPP_PHONE = "5492474568933";

/* ---------- helper ---------- */
function log(msg, ...rest) {
  console.log("[miTienda]", msg, ...rest);
}

window.goToCategory = function(cat) {
  log("navegar a categoría", cat);
  window.location.href = `category.html?cat=${cat}`;
};

/* ---------- productos (tu listado) ---------- */
const products = {
  perfumes: [
    { name: "Perfume Exclusivo", desc: "Aroma floral elegante", price: 12000, oldPrice: 15000, img: "img/perfume1.jpg" },
    { name: "Aroma Mujer", desc: "Fragancia fresca y activa", price: 9000, oldPrice: null, img: "img/perfume2.jpg" }
  ],
  cremas: [
    { name: "Sweet Honesty Treas.", desc: "Desodorante Roll-On", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante1.jpg" },
    { name: "Pur Blanca", desc: "Aroma Pur Blanca", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante2.jpg" },
    { name: "Love U", desc: "Desodorante Love U", price: 1900, oldPrice: 3800, discount: 50, img: "img/desodorante3.jpg" }
  ],
  kids: [
    { name: "Recipiente unicornio", desc: "Lunchera", price: 5000, img: "img/kids1.jpg" }
  ],
  hogar: [
    { name: "Organizador Multiuso", desc: "Para la casa", price: 4500, img: "img/hogar1.jpg" }
  ]
};

/* ---------- estado (localStorage) ---------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }
function saveFavorites() { localStorage.setItem("favorites", JSON.stringify(favorites)); }
function formatPrice(n) { return "$ " + Number(n).toLocaleString("es-AR"); }

log("script cargado", { cartLoaded: cart.length, favLoaded: Object.keys(favorites).length });

/* ---------- burbuja ---------- */
function updateCartBubble() {
  const bubble = document.getElementById("cart-bubble");
  if (!bubble) { log("no existe #cart-bubble en esta página"); return; }
  const total = cart.reduce((s,i)=> s + (i.qty || 0), 0);
  bubble.textContent = total;
  bubble.style.display = total > 0 ? "inline-flex" : "none";
  log("burbuja actualizada", total);
}

/* ---------- carrito helpers ---------- */
function findCartItem(id) { return cart.find(i=>i.id === id); }

function addToCart(id) {
  log("addToCart llamado con id:", id);
  const [category, idx] = id.split("-");
  const index = Number(idx);
  if (!products[category] || !products[category][index]) {
    log("producto no encontrado:", id);
    return;
  }
  let existing = findCartItem(id);
  if (existing) existing.qty += 1;
  else cart.push({ id, category, index, qty: 1 });
  saveCart();
  updateCartBubble();
  flashCartButton();
}

function removeFromCart(id) {
  cart = cart.filter(i=> i.id !== id);
  saveCart();
  updateCartBubble();
  renderCartModal();
}

function increaseQty(id) {
  const it = findCartItem(id);
  if (!it) return;
  it.qty++;
  saveCart();
  updateCartBubble();
  renderCartModal();
}
function decreaseQty(id) {
  const it = findCartItem(id);
  if (!it) return;
  it.qty--;
  if (it.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCartModal(); updateCartBubble(); }
}

/* ---------- modal ---------- */
function openCart() {
  const modal = document.getElementById("cart-modal");
  if (!modal) { log("openCart: modal no existe"); return; }
  modal.style.display = "flex";
  renderCartModal();
}
function closeCart() {
  const modal = document.getElementById("cart-modal");
  if (!modal) return;
  modal.style.display = "none";
}
window.addEventListener("click", (e) => {
  const modal = document.getElementById("cart-modal");
  if (modal && e.target === modal) modal.style.display = "none";
});

/* ---------- render modal ---------- */
function renderCartModal() {
  const list = document.getElementById("cart-items");
  if (!list) { log("renderCartModal: #cart-items no existe"); return; }
  list.innerHTML = "";
  if (!cart.length) {
    list.innerHTML = "<p>Tu bolsa está vacía.</p>";
    return;
  }
  cart.forEach(item => {
    const p = products[item.category][item.index];
    const subtotal = p.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div style="display:flex; gap:10px; align-items:center;">
        <img src="${p.img}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
        <div style="flex:1"><strong>${p.name}</strong><br><small>${p.desc || ""}</small></div>
        <div style="text-align:right">
          ${formatPrice(p.price)}
          <div style="margin-top:6px;">
            <button onclick="decreaseQty('${item.id}')">−</button>
            <span style="padding:0 8px;">${item.qty}</span>
            <button onclick="increaseQty('${item.id}')">+</button>
          </div>
        </div>
      </div>
      <div style="text-align:right;margin-top:8px;font-weight:700;">${formatPrice(subtotal)}</div>
      <div style="text-align:right;margin-top:6px;"><button onclick="removeFromCart('${item.id}')">Eliminar</button></div>
    `;
    list.appendChild(row);
  });

  const total = cart.reduce((s,it) => s + products[it.category][it.index].price * it.qty, 0);
  const totalRow = document.createElement("div");
  totalRow.style.paddingTop = "12px";
  totalRow.style.borderTop = "1px solid #eee";
  totalRow.innerHTML = `<div style="display:flex;justify-content:space-between"><strong>Total</strong><strong>${formatPrice(total)}</strong></div>`;
  list.appendChild(totalRow);

  // habilitar checkout button (puede estar en index o category)
  const checkoutBtn = document.querySelector(".checkout-btn") || document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.onclick = sendToWhatsApp;
  } else {
    log("renderCartModal: checkout button no encontrado");
  }
}

/* ---------- checkout (whatsapp) ---------- */
function sendToWhatsApp() {
  if (!cart.length) { alert("Tu bolsa está vacía"); return; }
  const lines = cart.map(it => {
    const p = products[it.category][it.index];
    return `• ${p.name} x${it.qty} - ${formatPrice(p.price * it.qty)}`;
  }).join("%0A");
  const total = cart.reduce((s,it) => s + products[it.category][it.index].price * it.qty, 0);
  const message = `Hola! Quiero comprar:%0A${lines}%0A%0ATotal: ${formatPrice(total)}`;
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank");
}

/* ---------- favoritos (simple) ---------- */
function toggleFavorite(id) {
  favorites[id] = !favorites[id];
  saveFavorites();
  renderProductsIfNeeded();
}

/* ---------- render productos en category ---------- */
const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get("cat");

function renderProductsIfNeeded() {
  if (!currentCategory) return;
  const container = document.getElementById("product-list");
  if (!container) { log("renderProductsIfNeeded: #product-list no existe"); return; }
  container.innerHTML = "";
  const arr = products[currentCategory] || [];
  arr.forEach((p,i) => {
    const id = `${currentCategory}-${i}`;
    const favClass = favorites[id] ? "fav-active" : "";
    container.innerHTML += `
      <div class="product-card">
        ${p.discount ? `<div class="discount-tag">-${p.discount}%</div>` : ""}
        <button class="fav-btn ${favClass}" onclick="toggleFavorite('${id}')">♥</button>
        <div class="img-wrapper"><img src="${p.img}" alt="${p.name}"></div>
        <h3>${p.name}</h3>
        <p style="color:var(--muted)">${p.desc || ""}</p>
        <div class="price-box">${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}<div class="price">${formatPrice(p.price)}</div></div>
        <button class="add-btn" onclick="addToCart('${id}')">Agregar al carrito 🛒</button>
      </div>
    `;
  });

  // attach hover zoom to images (defensive)
  document.querySelectorAll(".product-card .img-wrapper img").forEach(img => {
    img.style.transition = "transform .35s ease";
    img.addEventListener("mouseenter", ()=> img.style.transform = "scale(1.08)");
    img.addEventListener("mouseleave", ()=> img.style.transform = "scale(1)");
  });
}

/* ---------- dark mode init ---------- */
function initDarkMode() {
  const toggle = document.getElementById("darkToggle");
  if (!toggle) { log("initDarkMode: no hay #darkToggle en esta página"); return; }
  const saved = localStorage.getItem("darkmode") === "true";
  if (saved) { document.body.classList.add("dark"); toggle.checked = true; }
  toggle.addEventListener("change", ()=> {
    const isDark = toggle.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkmode", isDark);
  });
}

/* ---------- inicialización ---------- */
document.addEventListener("DOMContentLoaded", () => {
  log("DOMContentLoaded: inicializando");
  updateCartBubble();
  initDarkMode();

  // open / close modal
  const openBtn = document.getElementById("open-cart");
  if (openBtn) openBtn.addEventListener("click", openCart);
  const closeBtn = document.getElementById("close-cart");
  if (closeBtn) closeBtn.addEventListener("click", closeCart);

  // checkout button in index or category
  const checkoutBtn = document.querySelector(".checkout-btn") || document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", sendToWhatsApp);

  // render category if present
  if (currentCategory) {
    const title = document.getElementById("category-title");
    if (title) title.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    renderProductsIfNeeded();
  }

  log("Inicialización completa");
});
