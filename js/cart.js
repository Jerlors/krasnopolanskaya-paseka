import { storage } from './utils/storage.js';
import { formatPrice } from './utils/formatPrice.js';
import { showToast } from './ui.js';

export class Cart {
  constructor() {
    this.items = storage.get('kp_cart') || [];
  }

  add(product) {
    const exist = this.items.find(i => i.id === product.id);
    if (exist) exist.qty++;
    else this.items.push({ ...product, qty: 1 });
    this.save();
    this.render();
    showToast(`${product.name} добавлен в корзину`);
  }

  changeQty(id, delta) {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return;
    this.items[idx].qty += delta;
    if (this.items[idx].qty <= 0) this.items.splice(idx, 1);
    this.save();
    this.render();
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  save() {
    storage.set('kp_cart', this.items);
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = this.items.reduce((s, i) => s + i.qty, 0);
      el.classList.toggle('active', this.items.length > 0);
    });
  }

  render() {
    const list = document.getElementById('cart-items');
    if (!list) return;
    if (this.items.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">Корзина пуста</div>`;
      return;
    }
    list.innerHTML = this.items.map(i => `
      <div style="display:flex;gap:12px;margin-bottom:16px;align-items:center;background:#fff;padding:12px;border-radius:12px;">
        <div style="width:48px;height:48px;background:var(--color-sand);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;">${i.img}</div>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:14px;">${i.name}</div>
          <div style="font-size:12px;color:var(--text-muted);">${formatPrice(i.price)} × ${i.qty}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <button onclick="window.cart.changeQty(${i.id}, -1)" style="width:24px;height:24px;background:#eee;border-radius:50%;">−</button>
          <span style="width:20px;text-align:center;font-size:14px;">${i.qty}</span>
          <button onclick="window.cart.changeQty(${i.id}, 1)" style="width:24px;height:24px;background:#eee;border-radius:50%;">+</button>
        </div>
      </div>
    `).join('');
    
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
  }
}