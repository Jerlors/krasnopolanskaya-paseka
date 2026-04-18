import { Cart } from './cart.js';
import { toggleDrawer } from './ui.js';
import { loadCatalog, setupFilters } from './catalog.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация корзины
  window.cart = new Cart();
  window.cart.render();
  window.toggleDrawer = toggleDrawer;

  // 2. Загрузка каталога
  loadCatalog();
  setupFilters();

  // 3. FAQ аккордеон
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
  });

  // 4. Форма отправки (демо)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Заявка отправлена! Мы свяжемся с вами в WhatsApp.');
      form.reset();
    });
  }

  // 5. Загрузка данных товара
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  if (productId && window.productsData) {
    const product = window.productsData.find(p => p.id == productId);
    if (product) renderProductPage(product);
  }
});

function renderProductPage(p) {
  const img = document.getElementById('product-img');
  const title = document.getElementById('product-title');
  const price = document.getElementById('product-price');
  const weight = document.getElementById('product-weight');
  
  if(img) img.textContent = p.img;
  if(title) title.textContent = p.name;
  if(price) price.textContent = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(p.price);
  if(weight) weight.textContent = p.weight;
  
  const btn = document.getElementById('add-to-cart-btn');
  if(btn) btn.onclick = () => window.cart.add(p);
}