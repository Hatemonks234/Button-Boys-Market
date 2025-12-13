function openOrder() {
  document.getElementById("orderBox").classList.remove("hidden");
}

function submitOrder() {
  const discord = document.getElementById("discord").value;
  const orderId = document.getElementById("orderId").value;

  if (!discord || !orderId) {
    alert("Fill everything");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  orders.push({
    discord,
    orderId,
    paid: true,
    delivered: false
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order submitted! Delivery soon.");
}
