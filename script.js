// Simple scripts: dark mode + swap icons + bottom nav active
(function(){
  const htmlBody = document.body;
  const toggle = document.getElementById('darkToggle');
  const logoTop = document.getElementById('logo-top');

  // Inicial: preferencia sistema o luz
  const stored = localStorage.getItem('paseyvea-theme');
  if(stored === 'dark'){
    htmlBody.classList.remove('light'); htmlBody.classList.add('dark');
  } else if (stored === 'light') {
    htmlBody.classList.remove('dark'); htmlBody.classList.add('light');
  } else {
    // usa prefer-color-scheme
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      htmlBody.classList.add('dark');
    } else {
      htmlBody.classList.add('light');
    }
  }

  // actualizar icons según modo
  function updateIcons(){
    const dark = htmlBody.classList.contains('dark');
    document.querySelectorAll('.bottom-nav img').forEach(img=>{
      const white = img.getAttribute('data-src-white');
      const bw = img.getAttribute('data-src-bw');
      if(white && bw){
        img.src = dark ? white : bw;
      }
    });
    // logo swap si existe versión blanca
    if(logoTop) {
      if(dark){
        logoTop.src = 'assets/logo/logo-pase-y-vea-blanco.png';
      } else {
        logoTop.src = 'assets/logo/logo-pase-y-vea.png';
      }
    }
  }
  updateIcons();

  // toggle handler
  if(toggle) toggle.addEventListener('click', e=>{
    if(htmlBody.classList.contains('dark')){
      htmlBody.classList.remove('dark'); htmlBody.classList.add('light'); localStorage.setItem('paseyvea-theme','light');
    } else {
      htmlBody.classList.remove('light'); htmlBody.classList.add('dark'); localStorage.setItem('paseyvea-theme','dark');
    }
    updateIcons();
  });

  // bottom nav interactions (simple)
  document.querySelectorAll('.nav-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      // here you can add routing behavior
    })
  });

  // If on foto.html: read query param to show selected image
  const fotoFull = document.getElementById('fotoFull');
  if(fotoFull){
    const url = new URL(window.location.href);
    const img = url.searchParams.get('img');
    if(img){
      // security: only use local assets folder names (basic)
      if(/^[a-z0-9\-\.]+\.(jpg|jpeg|png)$/i.test(img)){
        fotoFull.src = `assets/img/${img}`;
      }
    }
  }

})();
