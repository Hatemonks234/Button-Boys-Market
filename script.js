function getStock() {
  return parseInt(localStorage.getItem("tb3_stock")) || 0;
}

function setStock(val) {
  localStorage.setItem("tb3_stock", val);
}

function updateStockDisplay() {
  const stock = getStock();
  const status = document.getElementById("stockStatus");
  const btn = document.getElementById("submitBtn");

  if (stock > 0) {
    status.innerHTML = "✅ In Stock: " + stock;
    status.style.color = "#4ade80";
    btn.disabled = false;
  } else {
    status.innerHTML = "❌ Out of Stock";
    status.style.color = "#f87171";
    btn.disabled = true;
  }
}

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  if (!discord) return alert("Enter your Discord");

  let stock = getStock();
  if (stock <= 0) return;

  const id = "TB3-" + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById("order").value = id;

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];
  orders.push({
    id,
    discord,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("tb3_orders", JSON.stringify(orders));
  setStock(stock - 1);
  updateStockDisplay();

  alert("Order placed! Pay using Cash App or Venmo, then send Order ID in Discord.");
}

updateStockDisplay();
