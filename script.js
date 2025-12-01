/* ============================================================
   script.js (versión modular, productos en products.js)
   ------------------------------------------------------------
   REQUIERE: <script src="products.js"></script> ANTES de script.js
===============================================================*/

(function () {
  const LOG = (...a) => console.log("[tienda]", ...a);

  const WHATSAPP_PHONE = "5492474568933";

  // Helpers
  const $ = (id) => document.getElementById(id);
  const format = (n) => "$ " + Number(n).toLocaleString("es-AR");

  // State (localStorage seguro)
  let cart = [];
  let favorites = {};

  try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch { cart = []; }
  try { favorites = JSON.parse(localStorage.getItem("favorites")) || {}; } catch { favorites = {}; }

  const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));
  const saveFavs = () => localStorage.setItem("favorites", JSON.stringify(favorites));

  // Debug Console Helpers
  window.dbg = {
    cart: () => JSON.parse(localStorage.getItem("cart") || "[]"),
    favs: () => JSON.parse(localStorage.getItem("favorites") || "{}"),
    clearCart: () => { localStorage.removeItem("cart"); cart = []; updateBubble(); }
  };

  /* ============================================================
     Navegación
  ============================================================*/
  window.goToCategory = function (cat) {
    window.location.href = `category.html?cat=${cat}`;
  };

  /* ============================================================
     Carrito
  ============================================================*/
  const findItem = (id) => cart.find((i) => i.id === id);

  window.addToCart = function (id) {
    const [cat, idx] = id.split("-");
    if (!products[cat] || !products[cat][idx]) return;

    let item = findItem(id);
    if (item) item.qty++;
    else cart.push({ id, category: cat, index: Number(idx), qty: 1 });

    saveCart();
    updateBubble();
    flashCart();
  };

  window.removeFromCart = function (id) {
    cart = cart.filter((i) => i.id !== id);
    saveCart();
    updateBubble();
    renderCart();
  };

  window.increaseQty = (id) => {
    let it = findItem(id);
    if (!it) return;
    it.qty++;
    saveCart();
    updateBubble();
    renderCart();
  };

  window.decreaseQty = (id) => {
    let it = findItem(id);
    if (!it) return;
    it.qty--;
    if (it.qty <= 0) removeFromCart(id);
    else {
      saveCart();
      updateBubble();
      renderCart();
    }
  };

  function updateBubble() {
    const b = $("cart-bubble");
    if (!b) return;
    const total = cart.reduce((s, i) => s + i.qty, 0);
    b.textContent = total;
    b.style.display = total > 0 ? "inline-flex" : "none";
  }

  /* ============================================================
     Modal Carrito
  ============================================================*/
  function openCart() {
    const m = $("cart-modal");
    if (m) {
      m.style.display = "flex";
      renderCart();
    }
  }

  function closeCart() {
    const m = $("cart-modal");
    if (m) m.style.display = "none";
  }

  window.openCart = openCart;
  window.closeCart = closeCart;

  window.addEventListener("click", (e) => {
    const m = $("cart-modal");
    if (m && e.target === m) closeCart();
  });

  function renderCart() {
    const box = $("cart-items");
    if (!box) return;

    box.innerHTML = "";

    if (!cart.length) {
      box.innerHTML = "<p>Tu bolsa está vacía.</p>";
      return;
    }

    cart.forEach((it) => {
      const p = products[it.category][it.index];
      const subtotal = p.price * it.qty;

      box.innerHTML += `
        <div class="cart-item">
          <div style="display:flex; gap:12px; align-items:center;">
            <img src="${p.img}" style="width:60px;height:60px;border-radius:6px;object-fit:cover;">
            <div style="flex:1;">
              <strong>${p.name}</strong><br>
              <small>${p.desc || ""}</small>
            </div>

            <div style="text-align:right;">
              <div>${format(p.price)}</div>
              <div style="margin-top:6px;">
                <button onclick="decreaseQty('${it.id}')">−</button>
                <span style="padding:0 8px">${it.qty}</span>
                <button onclick="increaseQty('${it.id}')">+</button>
              </div>
            </div>
          </div>

          <div style="text-align:right; margin-top:8px; font-weight:700;">
            ${format(subtotal)}
          </div>

          <div style="text-align:right; margin-top:6px;">
            <button onclick="removeFromCart('${it.id}')">Eliminar</button>
          </div>
        </div>
      `;
    });

    const total = cart.reduce((s, it) => s + products[it.category][it.index].price * it.qty, 0);

    box.innerHTML += `
      <div style="padding-top:12px; border-top:1px solid #ddd;">
        <div style="display:flex; justify-content:space-between;">
          <strong>Total</strong>
          <strong>${format(total)}</strong>
        </div>
      </div>
    `;

    const btn = document.querySelector(".checkout-btn");
    if (btn) btn.onclick = sendToWhatsApp;
  }

  /* ============================================================
     WhatsApp Checkout
  ============================================================*/
  function sendToWhatsApp() {
    if (!cart.length) return alert("Tu bolsa está vacía.");

    const lines = cart.map((it) => {
      const p = products[it.category][it.index];
      return `• ${p.name} x${it.qty} - ${format(p.price * it.qty)}`;
    }).join("%0A");

    const total = cart.reduce(
      (s, it) => s + products[it.category][it.index].price * it.qty,
      0
    );

    const msg = `Hola! Quiero comprar:%0A${lines}%0A%0ATotal: ${format(total)}`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, "_blank");
  }

  window.sendToWhatsApp = sendToWhatsApp;

  /* ============================================================
     Render Productos (category.html)
  ============================================================*/
  const params = new URLSearchParams(window.location.search);
  const currentCat = params.get("cat");

  function renderCategory() {
    if (!currentCat) return;

    const zone = $("product-list");
    if (!zone) return;

    $("category-title").textContent =
      currentCat.charAt(0).toUpperCase() + currentCat.slice(1);

    zone.innerHTML = "";

    (products[currentCat] || []).forEach((p, i) => {
      const id = `${currentCat}-${i}`;
      const fav = favorites[id] ? "fav-active" : "";

      zone.innerHTML += `
        <div class="product-card">

          ${p.discount ? `<div class="discount-tag">-${p.discount}%</div>` : ""}

          <button class="fav-btn ${fav}" onclick="toggleFavorite('${id}')">♥</button>

          <div class="img-wrapper">
            <img src="${p.img}">
          </div>

          <h3>${p.name}</h3>
          <p>${p.desc || ""}</p>

          <div class="price-box">
            ${p.oldPrice ? `<span class="old-price">${format(p.oldPrice)}</span>` : ""}
            <div class="price">${format(p.price)}</div>
          </div>

          <button class="add-btn" onclick="addToCart('${id}')">Agregar al carrito 🛒</button>
        </div>
      `;
    });

    // zoom hover
    document.querySelectorAll(".product-card img").forEach((img) => {
      img.style.transition = ".35s";
      img.addEventListener("mouseenter", () => (img.style.transform = "scale(1.08)"));
      img.addEventListener("mouseleave", () => (img.style.transform = "scale(1)"));
    });
  }

  /* ============================================================
     Favoritos
  ============================================================*/
  window.toggleFavorite = function (id) {
    favorites[id] = !favorites[id];
    saveFavs();
    renderCategory();
  };

  /* ============================================================
     Dark Mode
  ============================================================*/
  function initDarkMode() {
    const t = $("darkToggle");
    if (!t) return;

    const saved = localStorage.getItem("darkmode") === "true";

    if (saved) {
      document.body.classList.add("dark");
      t.checked = true;
    }

    t.addEventListener("change", () => {
      const active = t.checked;
      document.body.classList.toggle("dark", active);
      localStorage.setItem("darkmode", active);
    });
  }

  /* ============================================================
     Flash botón carrito
  ============================================================*/
  function flashCart() {
    const btn = $("open-cart");
    if (!btn) return;
    btn.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }],
      { duration: 220 }
    );
  }

  /* ============================================================
     INIT
  ============================================================*/
  document.addEventListener("DOMContentLoaded", () => {
    updateBubble();
    initDarkMode();

    if ($("open-cart")) $("open-cart").onclick = openCart;
    if ($("close-cart")) $("close-cart").onclick = closeCart;

    if (currentCat) renderCategory();
  });

})();
