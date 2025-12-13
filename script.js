// STOCK
function getStock() {
  return parseInt(localStorage.getItem("tb3_stock")) || 0;
}

function setStock(val) {
  localStorage.setItem("tb3_stock", val);
}

// UPDATE PRODUCT PAGE
function updateStockUI() {
  const stock = getStock();
  const status = document.getElementById("stockStatus");
  const btn = document.getElementById("submitBtn");

  if (!status) return;

  if (stock > 0) {
    status.textContent = "✔ In Stock";
    status.style.color = "#00ff88";
    btn.disabled = false;
  } else {
    status.textContent = "✖ Out of Stock";
    status.style.color = "#ff4d4d";
    btn.disabled = true;
  }
}

// UPDATE CARD
function updateCardStock() {
  const stock = getStock();
  const el = document.getElementById("cardStock");
  if (!el) return;
  el.textContent = stock > 0 ? "In Stock" : "Out of Stock";
  el.style.color = stock > 0 ? "#00ff88" : "#ff4d4d";
}

// ORDER
function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  if (!discord) return alert("Enter your Discord");

  const stock = getStock();
  if (stock <= 0) return alert("Out of stock");

  const id = "TB3-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  document.getElementById("order").value = id;

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];
  orders.push({
    id,
    discord,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("tb3_orders", JSON.stringify(orders));
  setStock(stock - 1);

  alert("Order submitted! Send Order ID in Discord.");
  updateStockUI();
}

updateStockUI();
