// ===== STOCK SYSTEM =====
function getStock() {
  return localStorage.getItem("stock") !== "out";
}

function toggleStock() {
  const current = getStock();
  localStorage.setItem("stock", current ? "out" : "in");
  updateStockUI();
}

function updateStockUI() {
  const status = document.getElementById("stockStatus");
  const btn = document.getElementById("stockBtn");

  if (!status || !btn) return;

  if (getStock()) {
    status.innerText = "Status: IN STOCK";
    btn.innerText = "Set Out of Stock";
  } else {
    status.innerText = "Status: OUT OF STOCK";
    btn.innerText = "Set In Stock";
  }
}

updateStockUI();

// ===== ORDER SYSTEM =====
const ordersDiv = document.getElementById("orders");

function addOrder(order) {
  const div = document.createElement("div");
  div.className = "product-card";

  div.innerHTML = `
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Discord:</strong> ${order.discord}</p>
    <p><strong>Status:</strong> <span class="status">Pending</span></p>

    <textarea placeholder="Admin notes"></textarea>

    <button onclick="markPaid(this)">Mark Paid</button>
    <button onclick="markDelivered(this)">Delivered</button>
  `;

  ordersDiv.prepend(div);
}

function markPaid(btn) {
  btn.parentElement.querySelector(".status").innerText = "Paid";
}

function markDelivered(btn) {
  btn.parentElement.querySelector(".status").innerText = "Delivered";
}

// ===== AUTO ORDER FROM PRODUCT PAGE =====
function submitOrder() {
  if (!getStock()) {
    alert("Out of stock");
    return;
  }

  const discord = document.getElementById("discord").value.trim();
  if (!discord) {
    alert("Enter Discord");
    return;
  }

  const orderId = "TB3-" + Math.floor(10000 + Math.random() * 90000);

  const order = {
    id: orderId,
    discord: discord
  };

  // Save locally for admin
  const saved = JSON.parse(localStorage.getItem("orders") || "[]");
  saved.unshift(order);
  localStorage.setItem("orders", JSON.stringify(saved));

  // Send webhook
  fetch("YOUR_DISCORD_WEBHOOK_HERE", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        `🧾 **NEW ORDER**\n🆔 ${orderId}\n👤 ${discord}\n💰 $8`
    })
  });

  alert("Order submitted! Order ID: " + orderId);
  document.getElementById("discord").value = "";
}

// Load orders on admin page
(function loadOrders() {
  if (!ordersDiv) return;
  const saved = JSON.parse(localStorage.getItem("orders") || "[]");
  saved.forEach(addOrder);
})();
