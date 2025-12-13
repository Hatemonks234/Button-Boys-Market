/* ========= STOCK ========= */

function getStock() {
  return parseInt(localStorage.getItem("tb3_stock")) || 0;
}

function setStock(val) {
  localStorage.setItem("tb3_stock", val);
}

/* ========= ORDER ID ========= */

function generateOrderId() {
  return "TB3-" + Math.floor(100000 + Math.random() * 900000);
}

/* ========= SUBMIT ORDER ========= */

function submitOrder() {
  const stock = getStock();
  if (stock <= 0) {
    alert("Out of stock");
    return;
  }

  const discordInput = document.getElementById("discord");
  if (!discordInput || discordInput.value.trim() === "") {
    alert("Enter your Discord username or ID");
    return;
  }

  const orderId = generateOrderId();

  // show ID in box
  const orderBox = document.getElementById("order");
  if (orderBox) orderBox.value = orderId;

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];

  orders.push({
    id: orderId,
    discord: discordInput.value.trim(),
    time: new Date().toLocaleString()
  });

  localStorage.setItem("tb3_orders", JSON.stringify(orders));

  setStock(stock - 1);

  alert("Order submitted!\nOrder ID: " + orderId);
  location.reload();
}

/* ========= ADMIN ========= */

function loadAdmin() {
  const stockEl = document.getElementById("currentStock");
  if (stockEl) stockEl.textContent = "Current stock: " + getStock();

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];
  const list = document.getElementById("orderList");
  if (!list) return;

  list.innerHTML = "";
  orders.forEach(o => {
    const li = document.createElement("li");
    li.textContent = `${o.id} — ${o.discord} (${o.time})`;
    list.appendChild(li);
  });
}
