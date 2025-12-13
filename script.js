// AUTO GENERATE ORDER ID
function generateOrderId() {
  return "TB3-" + Math.floor(10000 + Math.random() * 90000);
}

// SET ORDER ID ON PAGE LOAD
window.onload = () => {
  document.getElementById("order").value = generateOrderId();
};

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const order = document.getElementById("order").value;

  if (!discord) {
    alert("Please enter your Discord");
    return;
  }

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER RECEIVED**\n\n" +
        "📦 **Product:** Stacked TB3 Account ($8)\n" +
        "🆔 **Order ID:** " + order + "\n" +
        "👤 **Discord:** " + discord + "\n\n" +
        "💰 **Status:** Awaiting payment"
    })
  })
  .then(() => {
    alert("Order submitted! Please complete payment and wait for delivery.");
    document.getElementById("discord").value = "";
    document.getElementById("order").value = generateOrderId();
  })
  .catch(() => {
    alert("Error sending order. Try again.");
  });
}
