// ================== CONFIG ==================
const STOCK_KEY = "tb3_stock";
const ORDERS_KEY = "tb3_orders";

// 🔔 DISCORD WEBHOOK (ORDER ALERT)
const WEBHOOK_URL =
  "https://discord.com/api/webhooks/https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL";

// ================== STOCK ==================
function getStock() {
  return parseInt(localStorage.getItem(STOCK_KEY)) || 0;
}

function setStock(val) {
  localStorage.setItem(STOCK_KEY, val);
  updateStockDisplay();
}

// ================== ORDERS ==================
function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// ================== PLACE ORDER ==================
function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  if (!discord) return alert("Enter your Discord");

  let stock = getStock();
  if (stock <= 0) return alert("Out of stock");

  const order = {
    id: "TB3-" + Math.floor(Math.random() * 999999),
    discord,
    status: "Pending",
    time: new Date().toLocaleString()
  };

  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);

  setStock(stock - 1);

  sendDiscordWebhook(order);

  alert("Order submitted! Send proof in Discord.");
  document.getElementById("discord").value = "";
}

// ================== DISCORD WEBHOOK ==================
function sendDiscordWebhook(order) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER RECEIVED**\n\n" +
        "🆔 Order ID: **" + order.id + "**\n" +
        "👤 Discord: **" + order.discord + "**\n" +
        "💰 Product: **Stacked TB3 Account ($8)**\n" +
        "📦 Status: **Pending**"
    })
  });
}

// ================== ADMIN LOAD ==================
function loadAdmin() {
  document.getElementById("currentStock").innerText =
    "Current Stock: " + getStock();

  const list = document.getElementById("orderList");
  list.innerHTML = "";

  const orders = getOrders();

  if (orders.length === 0) {
    list.innerHTML = "<li>No orders yet</li>";
    return;
  }

  orders.forEach((o, i) => {
    const li = document.createElement("li");
    li.className = "order-item";

    li.innerHTML = `
      <div>
        <strong>${o.id}</strong><br>
        Discord: ${o.discord}<br>
        Status: <span class="${o.status.toLowerCase()}">${o.status}</span><br>
        Time: ${o.time}
      </div>

      <div class="order-actions">
        <button onclick="markDelivered(${i})">Deliver</button>
        <button class="danger" onclick="clearOrder(${i})">Clear</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// ================== ADMIN ACTIONS ==================
function markDelivered(index) {
  const orders = getOrders();
  orders[index].status = "Delivered";
  saveOrders(orders);
  loadAdmin();
}

function clearOrder(index) {
  const orders = getOrders();
  orders.splice(index, 1);
  saveOrders(orders);
  loadAdmin();
}

// ================== STOCK DISPLAY ==================
function updateStockDisplay() {
  const el = document.getElementById("stockStatus");
  if (!el) return;

  const stock = getStock();
  if (stock > 0) {
    el.innerText = "✅ In Stock (" + stock + ")";
    el.style.color = "#6fff9f";
  } else {
    el.innerText = "❌ Out of Stock";
    el.style.color = "#ff6f6f";
  }
}

updateStockDisplay();
