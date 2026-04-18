export function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

export function toggleDrawer(isOpen) {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (typeof isOpen === 'boolean') {
    overlay.classList.toggle('open', isOpen);
    drawer.classList.toggle('open', isOpen);
  } else {
    overlay.classList.toggle('open');
    drawer.classList.toggle('open');
  }
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}