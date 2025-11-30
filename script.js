const productsData = {
  perfumes: [
    { name: "Perfume Floral", price: "$4500", img: "img/perfume1.jpg" },
    { name: "Colonia Fresca", price: "$3200", img: "img/perfume2.jpg" }
  ],
  cremas: [
    { name: "Crema Hidratante", price: "$2800", img: "img/crema1.jpg" },
    { name: "Body Lotion", price: "$3500", img: "img/crema2.jpg" }
  ],
  kids: [
    { name: "Shampoo Infantil", price: "$2000", img: "img/kids1.jpg" }
  ],
  hogar: [
    { name: "Set Organizadores", price: "$3000", img: "img/hogar1.jpg" },
    { name: "Dispenser Baño", price: "$2500", img: "img/hogar2.jpg" }
  ]
};

function loadCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");

  if (!cat || !productsData[cat]) return;

  document.getElementById("cat-title").innerText =
    cat.charAt(0).toUpperCase() + cat.slice(1);

  const container = document.getElementById("products");

  productsData[cat].forEach(p => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <div class="price">${p.price}</div>
    `;
    container.appendChild(item);
  });
}

if (window.location.pathname.includes("category.html")) {
  loadCategory();
}
