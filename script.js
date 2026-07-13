// ======== DATA PRODUK ========
const products = [
  { id: 1, name: "Keripik Singkong Original", price: 20000, category: "best", image: "https://i.pinimg.com/1200x/fc/1e/85/fc1e856ede8e5ae2305529fdd2453d8e.jpg" },
  { id: 2, name: "Keripik Pisang", price: 25000, category: "best", image: "https://i.pinimg.com/1200x/1b/0a/79/1b0a799b84975171062e9be0ee43b713.jpg" },
  { id: 3, name: "Basreng Pedas", price: 18000, category: "terlaris", image: "https://i.pinimg.com/1200x/22/eb/d9/22ebd9ffebbd119f36f94c565183d5d9.jpg" },
  { id: 4, name: "Makaroni Pedas", price: 20000, category: "terlaris", image: "https://i.pinimg.com/736x/36/bf/39/36bf39fb8a93718f0eecfe8c8935a629.jpg" },
  { id: 5, name: "Seblak Kering", price: 22000, category: "best", image: "https://i.pinimg.com/1200x/fe/7b/2f/fe7b2f0c3716851c9a8e9944c1ebcd32.jpg" },
  { id: 6, name: "Kacang Disco", price: 18000, category: "best", image: "https://i.pinimg.com/1200x/f5/86/a6/f586a66b78ec33cbcc22558af84fc876.jpg" },
  { id: 7, name: "Kerupuk Seblak", price: 15000, category: "terlaris", image: "https://i.pinimg.com/1200x/d5/c3/a0/d5c3a076c3d0e3d3cf3a6d8bff78d28a.jpg" },
  { id: 8, name: "Stik Keju", price: 25000, category: "terlaris", image: "https://i.pinimg.com/1200x/70/f9/ae/70f9aef4a2b28cd53f079f9d838785ce.jpg" }
];

let cart = [];

// ======== RENDER FUNCTIONS ========

// Render katalog
function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}" />
      <h4>${p.name}</h4>
      <div class="price">Rp${p.price.toLocaleString()}</div>
      <div class="actions">
        <button class="btn-detail" onclick="alert('Detail ${p.name}')">Detail</button>
        <button class="btn-cart" onclick="addToCart(${p.id})">Tambah</button>
      </div>
    </div>
  `).join('');
}

// Best seller
function renderBest() {
  const best = products.filter(p => p.category === 'best');
  document.getElementById('bestGrid').innerHTML = best.map(p => `
    <div class="card"><span class="badge">🔥 Best Seller</span>
      <img src="${p.image}" /><h4>${p.name}</h4><div class="price">Rp${p.price.toLocaleString()}</div>
      <div class="actions"><button class="btn-cart" onclick="addToCart(${p.id})">Tambah</button></div>
    </div>
  `).join('');
}

// Terlaris
function renderTerlaris() {
  const ter = products.filter(p => p.category === 'terlaris');
  document.getElementById('terlarisGrid').innerHTML = ter.map(p => `
    <div class="card"><span class="badge" style="background:#c9a84c;">⭐ Terlaris</span>
      <img src="${p.image}" /><h4>${p.name}</h4><div class="price">Rp${p.price.toLocaleString()}</div>
      <div class="actions"><button class="btn-cart" onclick="addToCart(${p.id})">Tambah</button></div>
    </div>
  `).join('');
}

// Rekomendasi slider
function renderRekom() {
  const rekom = products.slice(0, 6);
  document.getElementById('rekomSlider').innerHTML = rekom.map(p => `
    <div class="card" style="min-width:200px;">
      <img src="${p.image}" /><h4>${p.name}</h4><div class="price">Rp${p.price.toLocaleString()}</div>
      <button class="btn-cart" onclick="addToCart(${p.id})">Tambah</button>
    </div>
  `).join('');
}

// ======== CART FUNCTIONS ========

function addToCart(id) {
  const p = products.find(x => x.id === id);
  const exist = cart.find(item => item.id === id);
  if (exist) exist.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById('cartItems');
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  if (cart.length === 0) { 
    container.innerHTML = '<p>Keranjang kosong</p>'; 
    document.getElementById('cartTotal').innerHTML = 'Total: Rp0'; 
    return; 
  }
  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <span>${item.name} x${item.qty}</span>
      <span>Rp${(item.price * item.qty).toLocaleString()}</span>
      <span>
        <button onclick="changeQty(${idx}, 1)">+</button>
        <button onclick="changeQty(${idx}, -1)">-</button>
        <button onclick="removeItem(${idx})"><i class="fas fa-trash"></i></button>
      </span>
    </div>
  `).join('');
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  document.getElementById('cartTotal').innerHTML = `Total: Rp${total.toLocaleString()}`;
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function removeItem(idx) { 
  cart.splice(idx, 1); 
  updateCartUI(); 
}

function resetCart() { 
  cart = []; 
  updateCartUI(); 
}

function toggleCart() { 
  document.getElementById('cartPanel').classList.toggle('open'); 
}

// ======== CHECKOUT FUNCTIONS ========

function openCheckout() {
  if (cart.length === 0) {
    alert('Keranjang kosong! Silakan tambahkan produk terlebih dahulu.');
    return;
  }
  document.getElementById('checkoutSection').style.display = 'block';
  document.getElementById('checkoutSection').scrollIntoView({ behavior: 'smooth' });
  toggleCart();
  // Reset payment states
  document.getElementById('paymentOptions').style.display = 'none';
  document.getElementById('paymentSuccess').style.display = 'none';
}

function showPayment() {
  const nama = document.getElementById('nama').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const hp = document.getElementById('hp').value.trim();
  
  if (!nama) return alert('Mohon isi Nama Lengkap');
  if (!alamat) return alert('Mohon isi Alamat Lengkap');
  if (!hp) return alert('Mohon isi Nomor Handphone');
  
  document.getElementById('paymentOptions').style.display = 'block';
  document.getElementById('paymentOptions').scrollIntoView({ behavior: 'smooth' });
}

function processPayment(method) {
  // Sembunyikan pilihan pembayaran
  document.getElementById('paymentOptions').style.display = 'none';
  
  // Tampilkan loading sebentar
  const successDiv = document.getElementById('paymentSuccess');
  successDiv.style.display = 'block';
  successDiv.innerHTML = `
    <div style="background: white; border-radius: 40px; padding: 3rem; box-shadow: var(--shadow); max-width: 500px; margin: 0 auto;">
      <div style="font-size: 3rem; color: var(--gold); margin-bottom: 1rem;">⏳</div>
      <h2 style="color: var(--maroon);">Memproses Pembayaran...</h2>
      <p style="color: #555;">Metode: ${method === 'Cash' ? 'Cash' : 'Transfer BNI'}</p>
    </div>
  `;
  
  // Simulasi proses pembayaran (2 detik)
  setTimeout(() => {
    successDiv.innerHTML = `
      <div style="background: white; border-radius: 40px; padding: 3rem; box-shadow: var(--shadow); max-width: 500px; margin: 0 auto;">
        <div style="font-size: 5rem; color: #4CAF50;">✅</div>
        <h2 style="color: var(--maroon); margin: 1rem 0;">Pembayaran Berhasil!</h2>
        <p style="color: #555;">Terima kasih telah berbelanja di Toko 3 Putra.</p>
        <p style="color: #555;">Pesanan Anda akan segera diproses.</p>
        <p style="color: #888; font-size: 0.9rem; margin-top: 0.5rem;">Metode: ${method === 'Cash' ? 'Cash' : 'Transfer BNI'}</p>
        <button onclick="resetAll()" style="background: var(--maroon); color: white; border: none; padding: 0.8rem 2.5rem; border-radius: 60px; font-weight: 700; margin-top: 1.5rem; cursor: pointer; transition: 0.2s;">
          Kembali Berbelanja
        </button>
      </div>
    `;
    successDiv.scrollIntoView({ behavior: 'smooth' });
  }, 2000);
}

function resetAll() {
  // Reset cart
  cart = [];
  updateCartUI();
  
  // Reset form
  document.getElementById('nama').value = '';
  document.getElementById('alamat').value = '';
  document.getElementById('hp').value = '';
  document.getElementById('kodepos').value = '';
  document.getElementById('catatan').value = '';
  
  // Hide checkout section and show products
  document.getElementById('checkoutSection').style.display = 'none';
  document.getElementById('paymentOptions').style.display = 'none';
  document.getElementById('paymentSuccess').style.display = 'none';
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Reset cart badge
  document.getElementById('cartCount').textContent = '0';
}

// ======== HERO SLIDER ========

let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.getElementById('dotsContainer');

function initDots() {
  slides.forEach((_, i) => { 
    const d = document.createElement('span'); 
    d.className = 'dot' + (i === 0 ? ' active' : ''); 
    d.dataset.index = i; 
    d.onclick = () => goToSlide(i); 
    dots.appendChild(d); 
  });
}

function goToSlide(i) {
  slides.forEach((s, idx) => { 
    s.classList.toggle('active', idx === i); 
  });
  document.querySelectorAll('.dot').forEach((d, idx) => 
    d.classList.toggle('active', idx === i)
  );
  slideIndex = i;
}

function changeSlide(dir) {
  let newIndex = slideIndex + dir;
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  goToSlide(newIndex);
}

// Auto slide
setInterval(() => changeSlide(1), 5000);

// ======== SEARCH ========

function searchProduct() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('#productGrid .card');
  cards.forEach(card => {
    const name = card.querySelector('h4').textContent.toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
}

// Enter key search
document.getElementById('searchInput').addEventListener('keyup', function(e) {
  if (e.key === 'Enter') searchProduct();
});

// ======== SCROLL TOP ========

window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTop');
  btn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

// ======== INIT ========

renderProducts();
renderBest();
renderTerlaris();
renderRekom();
initDots();
updateCartUI();

console.log('Toko 3 Putra siap!');
console.log('Total produk:', products.length);