function getStock() {
  return parseInt(localStorage.getItem("tb3_stock")) || 0;
}

function setStock(v) {
  localStorage.setItem("tb3_stock", v);
}

function updateStockUI() {
  const s = getStock();
  const st = document.getElementById("stockStatus");
  const btn = document.getElementById("submitBtn");

  if (!st) return;

  if (s > 0) {
    st.textContent = "✔ In Stock";
    st.style.color = "#00ff88";
    btn.disabled = false;
  } else {
    st.textContent = "✖ Out of Stock";
    st.style.color = "#ff4d4d";
    btn.disabled = true;
  }
}

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  if (!discord) return;

  const stock = getStock();
  if (stock <= 0) return;

  const id = "TB3-" + Math.random().toString(36).slice(2,8).toUpperCase();
  document.getElementById("order").value = id;

  const orders = JSON.parse(localStorage.getItem("tb3_orders")) || [];
  orders.push({ id, discord, time: new Date().toLocaleString() });

  localStorage.setItem("tb3_orders", JSON.stringify(orders));
  setStock(stock - 1);

  document.getElementById("modalOrder").textContent = id;
  document.getElementById("modal").style.display = "flex";

  updateStockUI();
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

updateStockUI();
