// ---------- STOCK ----------
function setStock(state) {
  localStorage.setItem("tb3_stock", state ? "in" : "out");
  updateStockUI();
}

function getStock() {
  return localStorage.getItem("tb3_stock") || "out";
}

function updateStockUI() {
  const stock = getStock();

  const stockText = document.getElementById("stockStatus");
  const adminStock = document.getElementById("adminStockStatus");
  const btn = document.getElementById("submitBtn");

  if (stockText) {
    stockText.innerText =
      stock === "in" ? "Status: IN STOCK" : "Status: OUT OF STOCK";
  }

  if (adminStock) {
    adminStock.innerText =
      stock === "in" ? "Current: IN STOCK" : "Current: OUT OF STOCK";
  }

  if (btn) {
    btn.disabled = stock !== "in";
    btn.innerText = stock === "in" ? "Submit Order" : "Out of Stock";
  }
}

// ---------- ORDER ID ----------
function generateOrderId() {
  return "TB3-" + Math.floor(10000 + Math.random() * 90000);
}

// ---------- SUBMIT ORDER ----------
function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const orderId = document.getElementById("orderId").value;

  if (!discord) {
    alert("Enter your Discord username or ID");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("tb3_orders") || "[]");

  orders.push({
    orderId,
    discord,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("tb3_orders", JSON.stringify(orders));

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER**\n\n" +
        "📦 Product: Stacked TB3 Account\n" +
        "🆔 Order ID: " + orderId + "\n" +
        "👤 Discord: " + discord
    })
  });

  alert("Order submitted! Check Discord.");
  document.getElementById("discord").value = "";
  document.getElementById("orderId").value = generateOrderId();
}

// ---------- LOAD ----------
document.addEventListener("DOMContentLoaded", () => {
  updateStockUI();

  const orderInput = document.getElementById("orderId");
  if (orderInput) {
    orderInput.value = generateOrderId();
  }

  const ordersDiv = document.getElementById("orders");
  if (ordersDiv) {
    const orders = JSON.parse(localStorage.getItem("tb3_orders") || "[]");
    ordersDiv.innerHTML = orders
      .map(o => `<p><b>${o.orderId}</b> - ${o.discord} (${o.time})</p>`)
      .join("");
  }
});
