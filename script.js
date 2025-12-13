// ===== STOCK =====
let inStock = localStorage.getItem("stock") !== "false";
updateStockUI();

function setStock(value) {
  inStock = value;
  localStorage.setItem("stock", value);
  updateStockUI();
}

function updateStockUI() {
  const status = document.getElementById("stockStatus");
  if (status) {
    status.textContent = inStock ? "IN STOCK" : "OUT OF STOCK";
  }
}

// ===== ORDERS =====
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function renderOrders() {
  const container = document.getElementById("orders");
  if (!container) return;

  container.innerHTML = "";

  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.style.padding = "12px";
    div.style.marginBottom = "10px";
    div.style.borderRadius = "8px";
    div.style.background = order.delivered ? "#0f172a" : "#111827";
    div.style.color = "#e5e7eb";

    div.innerHTML = `
      <strong>${order.id}</strong> - ${order.user}
      <br><small>${order.time}</small>
      <br>
      <span style="color:${order.delivered ? '#22c55e' : '#facc15'}">
        ${order.delivered ? "✅ Delivered" : "⏳ Pending"}
      </span>
      <br><br>
      ${
        order.delivered
          ? `<button onclick="removeOrder(${index})">Remove</button>`
          : `<button onclick="markDelivered(${index})">End Order</button>`
      }
    `;

    container.appendChild(div);
  });
}

function markDelivered(index) {
  orders[index].delivered = true;
  saveOrders();
  renderOrders();
}

function removeOrder(index) {
  if (!confirm("Remove this order permanently?")) return;
  orders.splice(index, 1);
  saveOrders();
  renderOrders();
}

renderOrders();
