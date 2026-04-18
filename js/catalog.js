import { formatPrice } from './utils/formatPrice.js';

export async function loadCatalog() {
  const container = document.getElementById('catalog-container');
  if (!container) return;
  
  try {
    const res = await fetch('data/products.json');
    const products = await res.json();
    window.productsData = products;
    renderGrid(products);
  } catch (e) {
    console.warn('JSON не загружен (нужен локальный сервер). Использую демо-данные.');
    const demo = [
      { id: 1, name: "Горное разнотравье", price: 950, weight: "500 г", img: "🍯", cat: "honey" },
      { id: 2, name: "Каштановый", price: 1100, weight: "500 г", img: "🌰", cat: "honey" },
      { id: 3, name: "Липовый", price: 980, weight: "500 г", img: "🌸", cat: "honey" },
      { id: 4, name: "Перга", price: 1400, weight: "250 г", img: "🐝", cat: "perga" }
    ];
    renderGrid(demo);
  }
}

function renderGrid(data) {
  const container = document.getElementById('catalog-container');
  if (!container) return;
  container.innerHTML = data.map(p => `
    <a href="product.html?id=${p.id}" class="card product-card">
      <div class="product-img">${p.img}</div>
      <h3 style="font-size:14px;margin-bottom:4px;">${p.name}</h3>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">${p.weight}</p>
      <div class="product-meta">
        <span style="font-weight:700;">${formatPrice(p.price)}</span>
        <button class="btn btn-primary btn-sm" onclick="event.preventDefault(); window.cart.add(${JSON.stringify(p).replace(/"/g, '&quot;')})">+</button>
      </div>
    </a>
  `).join('');
}

export function setupFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      const filtered = window.productsData.filter(p => !cat || p.cat === cat);
      const container = document.getElementById('catalog-container');
      container.innerHTML = filtered.map(p => `
        <a href="product.html?id=${p.id}" class="card product-card">
          <div class="product-img">${p.img}</div>
          <h3 style="font-size:14px;margin-bottom:4px;">${p.name}</h3>
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">${p.weight}</p>
          <div class="product-meta">
            <span style="font-weight:700;">${formatPrice(p.price)}</span>
            <button class="btn btn-primary btn-sm" onclick="event.preventDefault(); window.cart.add(${JSON.stringify(p).replace(/"/g, '&quot;')})">+</button>
          </div>
        </a>
      `).join('');
    });
  });
}