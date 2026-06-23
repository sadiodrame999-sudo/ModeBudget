async function startCheckout() {
  const cart = JSON.parse(localStorage.getItem('modebudget_cart_v1') || '[]');

  if (!cart.length) {
    alert('Votre panier est vide.');
    return;
  }

  const button = document.querySelector('[data-checkout-button]');
  if (button) {
    button.disabled = true;
    button.textContent = 'Redirection...';
  }

  try {
    const SHIPPING_FEE = 500;
    const shippingFee = cart.length ? SHIPPING_FEE : 0;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map((item) => ({
          title: item.title,
          category: item.category,
          amount: item.amount,
          quantity: item.quantity,
        })),
        shippingFee,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Impossible de créer la session de paiement.');
    }

    window.location.href = data.url;
  } catch (error) {
    alert(error.message);
    if (button) {
      button.disabled = false;
      button.textContent = 'Payer';
    }
  }
}

function injectCheckoutButton() {
  const summary = document.querySelector('.cart-summary');
  if (!summary || summary.querySelector('[data-checkout-button]')) {
    return;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-primary';
  button.setAttribute('data-checkout-button', 'true');
  button.textContent = 'Payer';
  button.addEventListener('click', startCheckout);
  summary.appendChild(button);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectCheckoutButton);
} else {
  injectCheckoutButton();
}
