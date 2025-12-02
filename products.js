/* ===============================
   BASE DE PRODUCTOS
   Editá libremente, no afecta nada
=================================*/

const products = {

  hombre: [
    { name: "Musk", desc: "Perfume de Hombre Musk+ Air. 75 ml.", price: 14820, oldPrice: 24700, discount: 40, img: "img/perfume1.jpg" },
    { name: "300 km/h", desc: "Perfume para hombre 300 KM/H Electric. 100 ml.", price: 19470, oldPrice: 35400, discount: 45, img: "img/perfume2.jpg" },
    { name: "Exclusive", desc: "Perfume de Hombre Exclusive in Blue. 100 ml.", price: 36400, oldPrice: 56000, discount: 35, img: "img/perfume3.jpg" },
    { name: "Black Suede", desc: "Versión Hot 100 mL diseñada para hombre.", price: 32000, oldPrice: null, img: "img/perfume4.jpg" },
     { name: "Wild Country", desc: "Eau de Toilette. Contenido: 120ml.", price: 15720, oldPrice: 26200, discount: 40, img: "img/colonia6.jpg" },

    /* Desodorantes Hombre */
    { name: "Wild Country", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante7.jpg" },
    { name: "Musk", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante8.jpg" },
    { name: "Black Suede Hot", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante9.jpg" },
    { name: "Black Suede Secret", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante10.jpg" },
    { name: "Black Suede Intense", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante11.jpg" },
    { name: "Legacy", desc: "Desodorante roll-on 50ml.", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante12.jpg" },

    /* Colonias Hombre */
    { name: "Wild Country", desc: "Colonia refrescante 150ml.", price: 6700, oldPrice: null, img: "img/colonia1.jpg" },
    { name: "Legacy", desc: "Colonia refrescante 150ml.", price: 7000, oldPrice: null, img: "img/colonia2.jpg" }
  ],

  mujer: [
    { name: "Sweet Honesty Treasures", desc: "Desodorante Roll-On", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante1.jpg" },
    { name: "Pur Blanca", desc: "Roll-on aroma Pur Blanca", price: 2850, oldPrice: 3800, discount: 25, img: "img/desodorante2.jpg" },
    { name: "Love U", desc: "Desodorante Roll-On Love U", price: 1900, oldPrice: 3800, discount: 50, img: "img/desodorante3.jpg" },
    { name: "Toque de Amor", desc: "Antitranspirante roll-on", price: 2850, oldPrice: 3800, img: "img/desodorante4.jpg" },
    { name: "Sweet Honesty", desc: "Roll-On", price: 2850, oldPrice: 3800, img: "img/desodorante5.jpg" },
    { name: "On Duty", desc: "Minimizador de Vello", price: 3080, oldPrice: 5600, discount: 45, img: "img/desodorante6.jpg" },

    /* Colonias Mujer */
    { name: "Sweet Honesty", desc: "Colonia 150ml", price: 4200, oldPrice: 7000, discount: 40, img: "img/colonia3.jpg" },
    { name: "Pasión Gitana", desc: "Colonia 150ml", price: 7000, oldPrice: null, img: "img/colonia4.jpg" },
    { name: "Imari", desc: "Colonia 150ml", price: 7000, oldPrice: null, img: "img/colonia5.jpg" },
     { name: "Far Away", desc: "Loción perfumada para el cuerpo Far Away Shine 90ml", price: 5460, oldPrice: 7800, discount: 30, img: "img/colonia7.jpg" },
     { name: "Far Away", desc: "Perfume de Mujer Purse Spray 15ml", price: 10080, oldPrice: 16800, discount: 40, img: "img/colonia8.jpg" },
     { name: "Far Away", desc: "Eau de parfum Far Away Shine 50ml", price: 32220, oldPrice: 53700, discount: 40, img: "img/colonia9.jpg" },
       { name: "Lov/u Date Night", desc: "Perfume para mujer Lov u Date Night 50ml", price: 28200, oldPrice: 47000, discount: 40, img: "img/colonia10.jpg" },
       { name: "Lov/u Together", desc: "Perfume de mujer Lov u Together 50ml", price: 30550, oldPrice: 47000, discount: 35, img: "img/colonia11.jpg" },
       { name: "Far Away Beyond", desc: "Perfume de Mujer Far Away Beyond 50ml", price: 32220, oldPrice: 53700, discount: 40, img: "img/colonia12.jpg" },
  ],

  cuidado: [
    { name: "Foot Works", desc: "Avon Aerosol Neutralizador Para Pies, 150ml", price: 7800, oldPrice: 12000, discount: 35, img: "img/cuidado1.jpg" },
    { name: "Avon Care", desc: "Crema para manos humectación esencial + Vitamina E. 75g.", price: 5500, img: "img/cuidado2.jpg" },
    { name: "Avon Care Sun+", desc: "Avon Care Sun Protector solar 50 FPS. 40g.", price: 13000, img: "img/cuidado3.jpg" },
     { name: "Avon naturals", desc: "Jabón líquido para manos refrescante. 250ml", price: 10150, oldPrice: 14500, discount: 30, img: "img/cuidado4.jpg" },
     { name: "Esmalte Color Trend", desc: "Avon Coleccion Minnie Rojo clásico 7ml", price: 2500, oldPrice: null, discount: null, img: "img/cuidado5.jpg" },
     { name: "Esmalte Color Trend", desc: "Avon Coleccion Minnie Negro noche 7ml", price: 2500, oldPrice: null, discount: null, img: "img/cuidado6.jpg" },
     { name: "Avon Care", desc: "Loción Corporal Frutos Rojos. 400ml", price: 9500, oldPrice: null, discount: null, img: "img/cuidado7.jpg" },
     { name: "Avon Care Sun+", desc: "Protector Solar 2 en 1 Rostro y Cuerpo FPS 50. 250g", price: 28125, oldPrice: 37500, discount: 25, img: "img/cuidado8.jpg" },
     { name: "Avon Care", desc: "Loción Corporal Palta. 400ml", price: 9500, oldPrice: null, discount: null, img: "img/cuidado9.jpg" },
     { name: "Encanto by Avon", desc: "Pack x 4 unidades de jabón cremoso, 80g x unidad", price: 6000, oldPrice: null, discount: null, img: "img/cuidado10.jpg" },
  ],

  hogarestilo: [
    { name: "Cucharas medidoras Carol", desc: "1 cuchara de 60 ml (1/4 de taza),1 cuchara de 80ml (1/3 de taza), 1 cuchara de 120ml (1/2 taza) , 1 cuchara 240ml (1 taza)", price: 5200, img: "img/hogarestilo1.jpg" },
    { name: "Dispenser", desc: "Jabón líquido", price: 4500, img: "img/hogar2.jpg" }
  ]
};







