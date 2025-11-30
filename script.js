// Ir a categoría
function goToCategory(cat) {
  window.location.href = `category.html?cat=${cat}`;
}

// Datos de ejemplo (colocá tus productos reales)
const productsData = {
  perfumes: [
    { name: "Perfume 1", price: "$5000", img: "img/perfume1.jpg" },
    { name: "Perfume 2", price: "$4500", img: "img/perfume2.jpg" }
  ],

  cremas: [
    { name: "Crema Facial", price: "$3000", img: "img/crema1.jpg" },
    { name: "Crema Corporal", price: "$3500", img: "img/crema2.jpg" }
  ],

  kids: [
    { name: "Colonia Kids", price: "$2500", img: "img/kids1.jpg" },
    { name: "Lunchera", price: "$8500", img: "img/kids2.jpg" }
  ],

  hogar: [
    { name: "Recipiente Plástico", price: "$2000", img: "img/hogar1.jpg" },
    { name: "Organizador Cocina", price: "$2800", img: "img/hogar2.jpg" }
  ]
};

// Imagen hero por categoría
const heroByCategory = {
  perfumes: { img: "img/perfumes.jpg", text: "Perfumes" },
  cremas:   { img: "img/cremas.jpg", text: "Cremas & Cuidado" },
  kids:     { img: "img/kids.jpg", text: "Niños" },
  hogar:    { img: "img/hogar.jpg", text: "Hogar" },
  default:  { img: "img/hero.jpg", text: "Productos" }
};

// Cargar categoría correspondiente
function loadCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");

  const hero = heroByCategory[cat] || heroByCategory.default;

  // HERO
  document.getElementById("category-hero-img").src = hero.img;
  document.getElementById("category-hero-text").innerText = hero.text;
  document.getElementById("cat-title").innerText = hero.text;

  // PRODUCTOS
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (productsData[cat]) {
    productsData[cat].forEach(p => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h4>${p.name}</h4>
        <div class="price">${p.price}</div>
      `;
      container.appendChild(item);
    });
  }
}

if (window.location.pathname.includes("category.html")) {
  loadCategory();
}

