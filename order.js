 /* ── Pak Din Nasi Dalcha — Ordering Cart ───────────────────────── */

const PAK_DIN_WHATSAPP = "60123456789"; // Change to Pak Din's WhatsApp number
const SERVICE_FEE = 2.50;

// Change this to your real ToyyibPay/Billplz payment link
const YOUR_PAYMENT_LINK =
  "https://toyyibpay.com/YOUR-FIXED-FEE-BILL-CODE";


let cart = {}; 
// Example:
// {
//   "Nasi Dalcha": { price: 8.50, qty: 2 }
// }


/* ── Add Item to Cart ───────────────────────── */

function addToCart(name, price) {

  if (!cart[name]) {
    cart[name] = {
      price: price,
      qty: 0
    };
  }

  cart[name].qty += 1;

  renderCart();
  openCart();
}


/* ── Change Quantity ───────────────────────── */

function changeQty(name, delta) {

  if (!cart[name]) return;

  cart[name].qty += delta;

  if (cart[name].qty <= 0) {
    delete cart[name];
  }

  renderCart();
}


/* ── Calculate Subtotal ───────────────────────── */

function cartSubtotal() {

  return Object.values(cart).reduce((sum, item) => {

    return sum + (item.price * item.qty);

  }, 0);

}


/* ── Calculate Cart Item Count ───────────────────────── */

function cartCount() {

  return Object.values(cart).reduce((sum, item) => {

    return sum + item.qty;

  }, 0);

}


/* ── Display Cart ───────────────────────── */

function renderCart() {

  const itemsEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  const feeEl = document.getElementById("cartFee");
  const totalEl = document.getElementById("cartTotal");
  const countEl = document.getElementById("cartCount");
  const emptyEl = document.getElementById("cartEmpty");


  if (!itemsEl) return;


  const names = Object.keys(cart);


  /* Cart Count */

  if (countEl) {
    countEl.textContent = cartCount();
  }


  /* Empty Cart */

  if (names.length === 0) {

    itemsEl.innerHTML = "";

    if (emptyEl) {
      emptyEl.style.display = "block";
    }

  } else {

    if (emptyEl) {
      emptyEl.style.display = "none";
    }


    itemsEl.innerHTML = names.map(name => {

      const item = cart[name];

      return `
        <div class="cart-item">

          <div class="cart-item-info">

            <span class="cart-item-name">
              ${name}
            </span>

            <span class="cart-item-price">
              RM ${(item.price * item.qty).toFixed(2)}
            </span>

          </div>


          <div class="cart-item-qty">

            <button onclick="changeQty('${name}', -1)">
              −
            </button>

            <span>${item.qty}</span>

            <button onclick="changeQty('${name}', 1)">
              +
            </button>

          </div>

        </div>
      `;

    }).join("");

  }


  /* Calculate Prices */

const subtotal = cartSubtotal();
const fee = subtotal > 0 ? SERVICE_FEE : 0;
const total = subtotal + fee;

if (subtotalEl) {
  subtotalEl.textContent = `RM ${subtotal.toFixed(2)}`;
}

if (feeEl) {
  feeEl.textContent = `RM ${fee.toFixed(2)}`;
}

if (totalEl) {
  totalEl.textContent = `RM ${total.toFixed(2)}`;
}
 


/* ── Open Cart ───────────────────────── */

function openCart() {

  const drawer =
    document.getElementById("cartDrawer");

  if (drawer) {
    drawer.classList.add("cart-open");
  }

}


/* ── Close Cart ───────────────────────── */

function closeCart() {

  const drawer =
    document.getElementById("cartDrawer");

  if (drawer) {
    drawer.classList.remove("cart-open");
  }

}


/* ── Send Order to WhatsApp ───────────────────────── */

function sendOrderWhatsApp() {

  const names = Object.keys(cart);


  if (names.length === 0) {

    alert("Your cart is empty — add a dish first.");

    return;

  }


  let msg =
    "Hi Pak Din, I'd like to order for PICKUP:\n\n";


  names.forEach(name => {

    const item = cart[name];


    msg +=
      `• ${name} x${item.qty} — RM ${(item.price * item.qty).toFixed(2)}\n`;

  });


  msg +=
    `\nSubtotal: RM ${cartSubtotal().toFixed(2)}`;


  msg +=
    `\n\nOrdered via Pak Din Nasi Dalcha Website`;


  msg +=
    `\nPickup Order`;


  const url =
    `https://wa.me/${PAK_DIN_WHATSAPP}?text=${encodeURIComponent(msg)}`;


  window.open(url, "_blank");

}


/* ── Pay Service Fee ───────────────────────── */

function payServiceFee() {

  if (Object.keys(cart).length === 0) {

    alert(
      "Add items to your cart first."
    );

    return;

  }


  window.open(
    YOUR_PAYMENT_LINK,
    "_blank"
  );

}


/* ── Load Cart ───────────────────────── */
if (totalEl) {
  totalEl.textContent = `RM ${total.toFixed(2)}`;
}

} // ← CLOSE renderCart() HERE


/* ── Open Cart ───────────────────────── */

function openCart() {

  const drawer = document.getElementById("cartDrawer");

  if (drawer) {
    drawer.classList.add("cart-open");
  }

}
