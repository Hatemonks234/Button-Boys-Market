/**********************
  GLOBAL STORAGE KEYS
**********************/
const STOCK_KEY = "tb3_stock";
const ORDERS_KEY = "tb3_orders";

/**********************
  UTIL FUNCTIONS
**********************/
function getStock() {
  return parseInt(localStorage.getItem(STOCK_KEY)) || 0;
}

function setStock(amount) {
  localStorage.setItem(STOCK_KEY, amount);
}

function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function generateOrderId() {
  return "TB3-" + Math.floor(10000 + Math.random() * 90000);
}

/**********************
  PRODUCT PAGE LOGIC
**********************/
function loadProductPage() {
  const stock = getStock();
  const statusEl = document.getElementById("stockStatus");
  const submitBtn = document.getElementById("submitOrder");

  if (!statusEl || !submitBtn) return;

  if (stock > 0) {
    statusEl.textContent = "IN STOCK";
    submitBtn.disabled = false;
  } else {
    statusEl.textContent = "OUT OF STOCK";
    submitBtn.disabled = true;
  }
}

function submitOrder() {
  const discordInput = document.getElementById("discordInput");
  if (!discordInput.value.trim()) {
    alert("Enter your Discord username or ID");
    return;
  }

  if (getStock() <= 0) {
    alert("Out of stock");
    return;
  }

  const order = {
    id: generateOrderId(),
    discord: discordInput.value.trim(),
    time: new Date().toLocaleString()
  };

  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);

  setStock(getStock() - 1);

  alert("Order placed!\nOrder ID: " + order.id);
  discordInput.value = "";

  loadProductPage();
}

/**********************
  ADMIN PAGE LOGIC
**********************/
function loadAdminPage() {
  const stockEl = document.getElementById("currentStock");
  const ordersEl = document.getElementById("ordersList");

  if (!stockEl || !ordersEl) return;

  stockEl.textContent = getStock();

  const orders = getOrders();
  ordersEl.innerHTML = "";

  if (orders.length === 0) {
    ordersEl.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "order-item";
    div.innerHTML = `
      <strong>${order.id}</strong><br>
      Discord: ${order.discord}<br>
      Time: ${order.time}<br>
      <button onclick="completeOrder(${index})">Complete Order</button>
      <hr>
    `;
    ordersEl.appendChild(div);
  });
}

function updateStock() {
  const input = document.getElementById("stockInput");
  const value = parseInt(input.value);

  if (isNaN(value) || value < 0) {
    alert("Enter a valid stock number");
    return;
  }

  setStock(value);
  input.value = "";
  loadAdminPage();
}

function completeOrder(index) {
  const orders = getOrders();
  orders.splice(index, 1);
  saveOrders(orders);
  loadAdminPage();
}

/**********************
  AUTO INIT
**********************/
document.addEventListener("DOMContentLoaded", () => {
  loadProductPage();
  loadAdminPage();
});
