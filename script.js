// ====== STORAGE KEYS ======
const STOCK_KEY = "tb3_stock";
const ORDERS_KEY = "tb3_orders";

// ====== STOCK ======
function getStock() {
  return parseInt(localStorage.getItem(STOCK_KEY)) || 0;
}

function setStock(amount) {
  localStorage.setItem(STOCK_KEY, amount);
  updateStockDisplay();
}

// ====== ORDERS ======
function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// ====== PLACE ORDER (PRODUCT PAGE) ======
function submitOrder(username, payment) {
  let stock = getStock();
  if (stock <= 0) return alert("Out of stock");

  const orders = getOrders();
  orders.push({
    id: Date.now(),
    user: username,
    payment: payment,
    time: new Date().toLocaleString()
  });

  saveOrders(orders);
  setStock(stock - 1);

  alert("Order placed! Send your Order ID in Discord.");
}

// ====== ADMIN LOAD ======
function loadAdmin() {
  document.getElementById("currentStock").innerText =
    "Current Stock: " + getStock();

  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  const orders = getOrders();

  if (orders.length === 0) {
    orderList.innerHTML = "<li>No orders yet.</li>";
    return;
  }

  orders.forEach((order, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "10px";

    li.innerHTML = `
      <strong>${order.user}</strong><br>
      Payment: ${order.payment}<br>
      Time: ${order.time}<br>
      <button onclick="clearOrder(${index})">Clear Order</button>
    `;

    orderList.appendChild(li);
  });
}

// ====== CLEAR SINGLE ORDER ======
function clearOrder(index) {
  const orders = getOrders();
  orders.splice(index, 1);
  saveOrders(orders);
  loadAdmin();
}

// ====== PRODUCT PAGE STOCK DISPLAY ======
function updateStockDisplay() {
  const el = document.getElementById("stockStatus");
  if (!el) return;

  const stock = getStock();
  if (stock > 0) {
    el.innerHTML = "✅ In Stock (" + stock + ")";
    el.style.color = "#6fff9f";
  } else {
    el.innerHTML = "❌ Out of Stock";
    el.style.color = "#ff6f6f";
  }
}

updateStockDisplay();
