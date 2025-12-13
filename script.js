function getStock() {
  return parseInt(localStorage.getItem("tb3_stock")) || 0;
}

function setStock(val) {
  localStorage.setItem("tb3_stock", val);
}

function updateProductStock() {
  const stock = getStock();
  const status = document.getElementById("stockStatus");
  const btn = document.getElementById("submitBtn");

  if (!status || !btn) return;

  if (stock > 0) {
    status.innerHTML = "✅ In Stock: " + stock;
    status.style.color = "#4caf50";
    btn.disabled = false;
  } else {
    status.innerHTML = "❌ Out of Stock";
    status.style.color = "#f44336";
    btn.disabled = true;
  }
}

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  if (!discord) return alert("Enter Discord username or ID");

  let stock = getStock();
  if (stock <= 0) return alert("Out of stock");

  const orderId = "TB3-" + Math.floor(10000 + Math.random() * 90000);

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];
  orders.push({
    id: orderId,
    discord,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("tb3_orders", JSON.stringify(orders));
  setStock(stock - 1);

  document.getElementById("order").value = orderId;
  document.getElementById("confirmation").style.display = "block";
  document.getElementById("orderIdText").textContent =
    "Your Order ID: " + orderId;

  updateProductStock();
}

document.addEventListener("DOMContentLoaded", updateProductStock);
