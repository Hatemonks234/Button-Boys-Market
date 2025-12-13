function generateOrderId() {
  return "TB3-" + Math.floor(10000 + Math.random() * 90000);
}

window.onload = function () {
  const orderInput = document.getElementById("order");
  if (orderInput) {
    orderInput.value = generateOrderId();
  }

  const btn = document.getElementById("submitBtn");
  if (btn) {
    btn.addEventListener("click", submitOrder);
  }
};

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const order = document.getElementById("order").value;

  if (!discord) {
    alert("Enter your Discord");
    return;
  }

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER**\n\n" +
        "📦 Product: Stacked TB3 Account ($8)\n" +
        "🆔 Order ID: " + order + "\n" +
        "👤 Discord: " + discord
    })
  })
  .then(() => {
    alert("Order sent! Complete payment.");
    document.getElementById("discord").value = "";
    document.getElementById("order").value = generateOrderId();
  })
  .catch(() => {
    alert("Webhook failed.");
  });
}
