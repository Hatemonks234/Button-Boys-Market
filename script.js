// ---------- STOCK ----------
function getStock() {
  return parseInt(localStorage.getItem("tb3_stock")) || 0;
}

function setStock(count) {
  localStorage.setItem("tb3_stock", count);
  updateStockUI();
}

function updateStockUI() {
  const stock = getStock();
  const status = document.getElementById("stockStatus");
  const btn = document.getElementById("submitBtn");

  if (!status || !btn) return;

  if (stock > 0) {
    status.textContent = `Status: IN STOCK (${stock} left)`;
    btn.disabled = false;
    btn.style.opacity = "1";
  } else {
    status.textContent = "Status: OUT OF STOCK";
    btn.disabled = true;
    btn.style.opacity = "0.5";
  }
}

// ---------- ORDER ----------
function generateOrderID() {
  return "TB3-" + Math.floor(10000 + Math.random() * 90000);
}

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  if (!discord) {
    alert("Enter your Discord info");
    return;
  }

  const stock = getStock();
  if (stock <= 0) {
    alert("Out of stock");
    return;
  }

  const orderId = generateOrderID();
  document.getElementById("order").value = orderId;

  // save order
  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];
  orders.push({
    id: orderId,
    discord,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("tb3_orders", JSON.stringify(orders));

  setStock(stock - 1);

  alert("Order submitted. Please open a ticket in Discord.");
}

// auto-generate order ID on load
window.onload = () => {
  const orderInput = document.getElementById("order");
  if (orderInput) orderInput.value = generateOrderID();
  updateStockUI();
};
