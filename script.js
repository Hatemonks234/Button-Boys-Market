/* =========================
   STORAGE KEYS
========================= */
const STOCK_KEY = "tb3_stock";
const ORDERS_KEY = "tb3_orders";

/* =========================
   STOCK FUNCTIONS
========================= */
function getStock() {
  return parseInt(localStorage.getItem(STOCK_KEY)) || 0;
}

function setStock(val) {
  localStorage.setItem(STOCK_KEY, val);
}

/* =========================
   ORDER ID GENERATOR
========================= */
function generateOrderId() {
  return "TB3-" + Math.floor(100000 + Math.random() * 900000);
}

/* =========================
   PRODUCT PAGE LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const stock = getStock();
  const stockStatus = document.getElementById("stockStatus");
  const submitBtn = document.getElementById("submitBtn");
  const orderInput = document.getElementById("order");

  if (orderInput) {
    orderInput.value = generateOrderId();
  }

  if (stock <= 0) {
    stockStatus.textContent = "❌ Out of Stock";
    stockStatus.style.color = "#ff5f5f";
    submitBtn.disabled = true;
  } else {
    stockStatus.textContent = "✅ In Stock (" + stock + ")";
    stockStatus.style.color = "#6fff9f";
    submitBtn.disabled = false;
  }
});

/* =========================
   SUBMIT ORDER
========================= */
function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const orderId = document.getElementById("order").value;

  if (!discord) {
    alert("Please enter your Discord username or ID.");
    return;
  }

  let stock = getStock();
  if (stock <= 0) {
    alert("Out of stock.");
    return;
  }

  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

  orders.push({
    id: orderId,
    discord: discord,
    product: "Stacked TB3 Account",
    price: "$8",
    time: new Date().toLocaleString()
  });

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  setStock(stock - 1);

  /* DISCORD WEBHOOK */
  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER**\n\n" +
        "📦 Product: Stacked TB3 Account\n" +
        "🆔 Order ID: " + orderId + "\n" +
        "👤 Discord: " + discord + "\n" +
        "💰 Price: $8\n" +
        "📊 Remaining Stock: " + (stock - 1)
    })
  });

  alert("Order submitted! After paying, send proof in Discord.");

  document.getElementById("discord").value = "";
  document.getElementById("order").value = generateOrderId();

  location.reload();
}

/* =========================
   ADMIN PAGE FUNCTIONS
========================= */
function loadAdmin() {
  const stockDisplay = document.getElementById("currentStock");
  const orderList = document.getElementById("orderList");

  if (!stockDisplay || !orderList) return;

  stockDisplay.textContent = "Current stock: " + getStock();

  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  orderList.innerHTML = "";

  orders.forEach((o, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${o.id}</strong><br>
      Discord: ${o.discord}<br>
      ${o.time}
      <br>
      <button onclick="endOrder(${index})">End Order</button>
      <hr>
    `;
    orderList.appendChild(li);
  });
}

function updateStock() {
  const val = parseInt(document.getElementById("stockInput").value);
  if (isNaN(val) || val < 0) {
    alert("Invalid stock value");
    return;
  }
  setStock(val);
  loadAdmin();
}

function endOrder(index) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  orders.splice(index, 1);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  loadAdmin();
}

/* AUTO LOAD ADMIN */
loadAdmin();
