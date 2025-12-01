
/* ---------- DEBUG-FRIENDLY script.js (reemplazar totalmente) ---------- */
(function(){
  try {
    const LOG_PREFIX = "[miTienda]";
    function L(...args){ console.log(LOG_PREFIX, ...args); }

    const WHATSAPP_PHONE = "5492474568933";

    // helpers
    function formatPrice(n){ return "$ " + Number(n).toLocaleString("es-AR"); }
    function safeGet(id){ return document.getElementById(id) || null; }

    // products (simplificado)
    /* ---------- DATOS DE PRODUCTOS (completo) ---------- */
const products = { 

  perfumes: [
    { 
      name: "Musk", 
      desc: "Perfume de Hombre Musk+ Air", 
      price: 14820, 
      oldPrice: 24700, 
      discount: 40, 
      img: "img/perfume1.jpg",
      fav: false
    }, 
    { 
      name: "300 km/h", 
      desc: "Perfume para hombre300 KM/H Electric, Eau de Toilette. Contenido: 100 ml.", 
      price: 19470, 
      oldPrice: 35400, 
      discount: 45,
      img: "img/perfume2.jpg",
      fav: false
    }, 
    { 
      name: "Exclusive", 
      desc: "Perfume de Hombre Exclusive in Blue, Eau de Toilette. Contenido: 100 ml.", 
      price: 36400, 
      oldPrice: 56000, 
      discount: 35,
      img: "img/perfume3.jpg",
      fav: false
    }, 
    { 
      name: "Black Suede", 
      desc: "Versión Hot de 100 mL diseñada específicamente para hombre.", 
      price: 32000, 
      oldPrice: null, 
      discount: null,
      img: "img/perfume4.jpg",
      fav: false
    }, 
    { 
      name: "Wild Country", 
      desc: "Desodorante antitranspirante roll-on 50ml.", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25,
      img: "img/desodorante7.jpg",
      fav: false
    }, 
    { 
      name: "Musk", 
      desc: "Desodorante antitranspirante roll-on 50ml.", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25,
      img: "img/desodorante8.jpg",
      fav: false
    }, 
    { 
      name: "Black Suede", 
      desc: "Desodorante Roll on - BLACK SUEDE HOT - 50 mL", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25,
      img: "img/desodorante9.jpg",
      fav: false
    }, 
    { 
      name: "Black Suede", 
      desc: "Desodorante Roll on - BLACK SUEDE SECRET - 50 mL", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25,
      img: "img/desodorante10.jpg",
      fav: false
    }, 
    { 
      name: "Black Suede", 
      desc: "Desodorante Roll on - BLACK SUEDE INTENSE - 50 mL", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25,
      img: "img/desodorante11.jpg",
      fav: false
    }, 
    { 
      name: "Legacy", 
      desc: "Desodorante Roll on fragancia hombre Legacy 50ml", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25,
      img: "img/desodorante12.jpg",
      fav: false
    }
  ],

  cremas: [
    { 
      name: "Sweet Honesty Treasures", 
      desc: "Desodorante Roll-On Sweet Honesty Treasures", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25, 
      img: "img/desodorante1.jpg",
      fav: false
    },
    { 
      name: "Pur Blanca", 
      desc: "Desodorante roll-on con aroma del perfume Pur Blanca.", 
      price: 2850, 
      oldPrice: 3800, 
      discount: 25, 
      img: "img/desodorante2.jpg",
      fav: false
    },
    { 
      name: "Love U", 
      desc: "Desodorante Roll-On Love U", 
      price: 1900, 
      oldPrice: 3800, 
      discount: 50, 
      img: "img/desodorante3.jpg",
      fav: false
    },
    { 
      name: "Toque de Amor", 
      desc: "Desodorante Antitranspirante Roll-on", 
      price: 2850, 
      oldPrice: 3800, 
      img: "img/desodorante4.jpg",
      fav: false
    },
    { 
      name: "Sweet Honesty", 
      desc: "Desodorante Roll-On Sweet Honesty", 
      price: 2850, 
      oldPrice: 3800, 
      img: "img/desodorante5.jpg",
      fav: false
    },
    { 
      name: "On Duty", 
      desc: "Desodorante On Duty Care Minimizador de Vello", 
      price: 3080, 
      oldPrice: 5600, 
      discount: 45, 
      img: "img/desodorante6.jpg",
      fav: false
    }
  ],

  kids: [
    { 
      name: "Recipiente unicornio", 
      desc: "Lunchera para niñas", 
      price: 5000, 
      oldPrice: null, 
      img: "img/kids1.jpg",
      fav: false
    },
    { 
      name: "Sábana M Kids", 
      desc: "Estampado para niños", 
      price: 5000, 
      oldPrice: null, 
      img: "img/kids2.jpg",
      fav: false
    }
  ],

  hogar: [
    { 
      name: "Organizador Multiuso", 
      desc: "Ideal para habitación", 
      price: 4500, 
      oldPrice: null, 
      img: "img/hogar1.jpg",
      fav: false
    },
    { 
      name: "Dispenser de jabón líquido", 
      desc: "Ideal para cocina o baño", 
      price: 4500, 
      oldPrice: null, 
      img: "img/hogar2.jpg",
      fav: false
    }
  ]
};


    // state
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch(e){ L("localStorage cart parse failed, resetting", e); cart = []; localStorage.removeItem("cart"); }
    let favorites = [];
    try { favorites = JSON.parse(localStorage.getItem("favorites")) || {}; } catch(e){ L("localStorage fav parse failed, resetting", e); favorites = {}; localStorage.removeItem("favorites"); }

    // expose navigation global for inline onclick
    window.goToCategory = function(cat){ L("goToCategory", cat); window.location.href = `category.html?cat=${cat}`; };

    // utilities
    function saveCart(){ try{ localStorage.setItem("cart", JSON.stringify(cart)); } catch(e){ L("saveCart error", e); } }
    function saveFavs(){ try{ localStorage.setItem("favorites", JSON.stringify(favorites)); } catch(e){ L("saveFavs error", e); } }

    // debug helpers to run in console
    window.__mi_debug = {
      cartSnap: () => JSON.parse(localStorage.getItem("cart")||"[]"),
      favSnap:  () => JSON.parse(localStorage.getItem("favorites")||"{}"),
      clearCart: () => { localStorage.removeItem("cart"); cart = []; updateCartBubble(); L("cart cleared"); }
    };

    // CART BUBBLE
    function updateCartBubble(){
      const bubble = safeGet("cart-bubble");
      if(!bubble){ L("updateCartBubble: #cart-bubble not found"); return; }
      const total = cart.reduce((s,i)=> s + (i.qty||0), 0);
      bubble.textContent = total;
      bubble.style.display = total>0 ? "inline-flex" : "none";
      L("updateCartBubble ->", total);
    }

    // find
    function findCartItem(id){ return cart.find(i=>i.id===id); }

    // addToCart (exposed to window for inline onclick)
    window.addToCart = function(id){
      try{
        L("addToCart", id);
        if(!id || typeof id !== "string"){ L("addToCart invalid id", id); return; }
        const [cat, idx] = id.split("-");
        if(!products[cat] || !products[cat][Number(idx)]){ L("addToCart product not found", id); return; }
        let ex = findCartItem(id);
        if(ex) ex.qty += 1;
        else cart.push({ id, category: cat, index: Number(idx), qty: 1 });
        saveCart();
        updateCartBubble();
        flashCartButton();
      } catch(e){ L("addToCart error", e); }
    };

    window.removeFromCart = function(id){
      try{
        cart = cart.filter(i=>i.id !== id);
        saveCart();
        updateCartBubble();
        renderCartModal();
        L("removeFromCart", id);
      } catch(e){ L("removeFromCart error", e); }
    };

    window.increaseQty = function(id){ try{ const it=findCartItem(id); if(it){it.qty++; saveCart(); updateCartBubble(); renderCartModal();} }catch(e){L(e);} };
    window.decreaseQty = function(id){ try{ const it=findCartItem(id); if(!it) return; it.qty--; if(it.qty<=0) removeFromCart(id); else {saveCart(); renderCartModal(); updateCartBubble();} }catch(e){L(e);} };

    // modal
    function openCart(){ const m=safeGet("cart-modal"); if(!m){ L("openCart: modal not found"); return; } m.style.display="flex"; renderCartModal(); }
    function closeCart(){ const m=safeGet("cart-modal"); if(m) m.style.display="none"; }

    window.openCart = openCart;
    window.closeCart = closeCart;

    window.addEventListener("click", (e)=>{
      const modal = safeGet("cart-modal");
      if(modal && e.target === modal) modal.style.display = "none";
    });

    // render modal
    function renderCartModal(){
      const list = safeGet("cart-items");
      if(!list){ L("renderCartModal: #cart-items not found"); return; }
      list.innerHTML = "";
      if(!cart.length){ list.innerHTML = "<p>Tu bolsa está vacía.</p>"; return; }
      cart.forEach(it=>{
        const p = products[it.category][it.index];
        const subtotal = p.price * it.qty;
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
          <div style="display:flex;gap:10px;align-items:center">
            <img src="${p.img}" style="width:56px;height:56px;object-fit:cover;border-radius:6px" />
            <div style="flex:1"><strong>${p.name}</strong><br><small>${p.desc||""}</small></div>
            <div style="text-align:right">${formatPrice(p.price)}<div style="margin-top:6px"><button onclick="decreaseQty('${it.id}')">−</button><span style="padding:0 8px">${it.qty}</span><button onclick="increaseQty('${it.id}')">+</button></div></div>
          </div>
          <div style="text-align:right;margin-top:8px;font-weight:700">${formatPrice(subtotal)}</div>
          <div style="text-align:right;margin-top:6px"><button onclick="removeFromCart('${it.id}')">Eliminar</button></div>
        `;
        list.appendChild(row);
      });
      const total = cart.reduce((s,it)=> s + products[it.category][it.index].price * it.qty, 0);
      const totalRow = document.createElement("div");
      totalRow.style.paddingTop = "12px";
      totalRow.style.borderTop = "1px solid #eee";
      totalRow.innerHTML = `<div style="display:flex;justify-content:space-between"><strong>Total</strong><strong>${formatPrice(total)}</strong></div>`;
      list.appendChild(totalRow);

      const checkoutBtn = document.querySelector(".checkout-btn") || safeGet("checkout-btn");
      if(checkoutBtn){
        checkoutBtn.disabled = false;
        checkoutBtn.onclick = sendToWhatsApp;
      } else L("renderCartModal: checkout button not found");
    }

    // whatsapp
    function sendToWhatsApp(){
      try{
        if(!cart.length){ alert("Tu bolsa está vacía"); return; }
        const lines = cart.map(it=>{
          const p = products[it.category][it.index];
          return `• ${p.name} x${it.qty} - ${formatPrice(p.price * it.qty)}`;
        }).join("%0A");
        const total = cart.reduce((s,it)=> s + products[it.category][it.index].price * it.qty, 0);
        const message = `Hola! Quiero comprar:%0A${lines}%0A%0ATotal: ${formatPrice(total)}`;
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank");
      }catch(e){ L("sendToWhatsApp error", e); }
    }
    window.sendToWhatsApp = sendToWhatsApp;

    // render products on category
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get("cat");

    function renderProductsIfNeeded(){
      if(!currentCategory) return;
      const container = safeGet("product-list");
      if(!container){ L("renderProductsIfNeeded: #product-list not found"); return; }
      container.innerHTML = "";
      const arr = products[currentCategory] || [];
      arr.forEach((p,i)=>{
        const id = `${currentCategory}-${i}`;
        const favClass = favorites[id] ? "fav-active" : "";
        container.innerHTML += `
          <div class="product-card">
            ${p.discount? `<div class="discount-tag">-${p.discount}%</div>` : ""}
            <button class="fav-btn ${favClass}" onclick="toggleFavorite('${id}')">♥</button>
            <div class="img-wrapper"><img src="${p.img}" alt="${p.name}"></div>
            <h3>${p.name}</h3>
            <p style="color:var(--muted)">${p.desc||""}</p>
            <div class="price-box">${p.oldPrice? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}<div class="price">${formatPrice(p.price)}</div></div>
            <button class="add-btn" onclick="addToCart('${id}')">Agregar al carrito 🛒</button>
          </div>
        `;
      });

      // hover zoom defensive
      document.querySelectorAll(".product-card .img-wrapper img").forEach(img=>{
        img.style.transition="transform .35s ease";
        img.addEventListener("mouseenter", ()=> img.style.transform="scale(1.08)");
        img.addEventListener("mouseleave", ()=> img.style.transform="scale(1)");
      });
    }

    // favorites
    window.toggleFavorite = function(id){ favorites[id] = !favorites[id]; saveFavs(); renderProductsIfNeeded(); }

    // dark mode
    function initDarkMode(){
      const toggle = safeGet("darkToggle");
      if(!toggle){ L("initDarkMode: no darkToggle on this page"); return; }
      const saved = localStorage.getItem("darkmode") === "true";
      if(saved){ document.body.classList.add("dark"); toggle.checked = true; }
      toggle.addEventListener("change", ()=> {
        const on = toggle.checked;
        document.body.classList.toggle("dark", on);
        localStorage.setItem("darkmode", on);
      });
      L("initDarkMode ready", saved);
    }

    // flash
    function flashCartButton(){ try{ const btn = safeGet("open-cart"); if(!btn) return; btn.animate([{transform:"scale(1)"},{transform:"scale(1.06)"},{transform:"scale(1)"}],{duration:220}); }catch(e){L("flash error",e);} }

    // init
    document.addEventListener("DOMContentLoaded", ()=>{
      try{
        L("DOM ready, initializing...");
        updateCartBubble();
        initDarkMode();

        const openBtn = safeGet("open-cart");
        if(openBtn) openBtn.addEventListener("click", openCart);

        const closeBtn = safeGet("close-cart");
        if(closeBtn) closeBtn.addEventListener("click", closeCart);

        const checkoutBtn = document.querySelector(".checkout-btn") || safeGet("checkout-btn");
        if(checkoutBtn) checkoutBtn.addEventListener("click", sendToWhatsApp);

        if(currentCategory){
          const title = safeGet("category-title");
          if(title) title.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
          renderProductsIfNeeded();
        }

        L("Initialization finished. cart length:", cart.length);
      }catch(e){
        L("DOMContentLoaded init error", e);
      }
    });

  } catch(err){
    console.error("[miTienda] Fatal error in script:", err);
  }
})();




