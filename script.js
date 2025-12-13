// ===== CONFIG =====
const WEBHOOK_URL = "PASTE_WEBHOOK_URL_HERE";

// ===== UTIL =====
function generateOrderId() {
  return "TB3-" + Math.floor(10000 + Math.random() * 90000);
}

// ===== STOCK =====
function setStock(inStock) {
  localStorage.setItem("tb3_stock", inStock ? "IN" : "OUT");
  updateStockUI();
}

function getStock() {
  return localStorage.getItem("tb3_stock") || "OUT";
}

// ===== PRODUCT PAGE =====
function updateStockUI() {
  const stock = getStock();
  const status = document.getElementById("stockStatus");
  const btn = document.getElementById("submitBtn");

  if (!status || !btn) return;

  if (stock === "IN") {
    status.textContent = "Status: IN STOCK";
    btn.disabled = false;
  } else {
    status.textContent = "Status: OUT OF STOCK";
    btn.disabled = true;
  }
}

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const orderId = document.getElementById("orderId").value;

  if (!discord) {
    alert("Enter your Discord");
    return;
  }

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER**\n" +
        "📦 Stacked TB3 Account ($8)\n" +
        "🆔 Order ID: " + orderId + "\n" +
        "👤 Discord: " + discord
    })
  });

  const orders = JSON.parse(localStorage.getItem("tb3_orders") || "[]");
  orders.push(orderId + " - " + discord + " (" + new Date().toLocaleString() + ")");
  localStorage.setItem("tb3_orders", JSON.stringify(orders));

  alert("Order submitted!");
  document.getElementById("discord").value = "";
  document.getElementById("orderId").value = generateOrderId();
}

// ===== ADMIN PAGE =====
function loadAdmin() {
  updateStockUI();

  const current = document.getElementById("currentStock");
  if (current) {
    current.textContent = "Current: " + (getStock() === "IN" ? "IN STOCK" : "OUT OF STOCK");
  }

  const ordersDiv = document.getElementById("orders");
  if (ordersDiv) {
    const orders = JSON.parse(localStorage.getItem("tb3_orders") || "[]");
    ordersDiv.innerHTML = orders.map(o => `<p>${o}</p>`).join("");
  }
}

function clearOrders() {
  if (confirm("End all orders?")) {
    localStorage.removeItem("tb3_orders");
    loadAdmin();
  }
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const orderInput = document.getElementById("orderId");
  if (orderInput) orderInput.value = generateOrderId();

  updateStockUI();
  loadAdmin();
});
