/* =========================
   STOCK FUNCTIONS
========================= */

function getStock() {
  return parseInt(localStorage.getItem("tb3_stock")) || 0;
}

function setStock(value) {
  localStorage.setItem("tb3_stock", value);
}

/* =========================
   ORDER FUNCTIONS
========================= */

function generateOrderId() {
  return "TB3-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const stock = getStock();

  if (!discord) {
    alert("Please enter your Discord username or ID.");
    return;
  }

  if (stock <= 0) {
    alert("Out of stock.");
    return;
  }

  const orderId = generateOrderId();
  document.getElementById("order").value = orderId;

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];
  orders.push({
    id: orderId,
    discord: discord,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("tb3_orders", JSON.stringify(orders));

  setStock(stock - 1);
  updateStockDisplay();

  alert(
    "Order created!\n\nOrder ID: " +
    orderId +
    "\n\nComplete payment and send this ID in Discord."
  );
}

/* =========================
   PRODUCT PAGE DISPLAY
========================= */

function updateStockDisplay() {
  const stock = getStock();
  const status = document.getElementById("stockStatus");
  const button = document.getElementById("submitBtn");

  if (!status || !button) return;

  if (stock > 0) {
    status.innerHTML = "✔ In Stock: " + stock;
    status.style.color = "#19ff52";
    button.disabled = false;
  } else {
    status.innerHTML = "✖ Out of Stock";
    status.style.color = "#ff5c5c";
    button.disabled = true;
  }
}

/* =========================
   ADMIN PAGE
========================= */

function loadAdmin() {
  const stockText = document.getElementById("currentStock");
  const list = document.getElementById("orderList");

  if (!stockText || !list) return;

  stockText.textContent = "Current stock: " + getStock();
  list.innerHTML = "";

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];

  orders.forEach(o => {
    const li = document.createElement("li");
    li.textContent = `${o.id} — ${o.discord} (${o.time})`;
    list.appendChild(li);
  });
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  updateStockDisplay();
  loadAdmin();
});
