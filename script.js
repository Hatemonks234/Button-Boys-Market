function generateOrderId() {
  return "TB3-" + Math.floor(1000 + Math.random() * 9000);
}

window.onload = function () {
  document.getElementById("order").value = generateOrderId();
};

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const order = document.getElementById("order").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const btn = document.getElementById("submitBtn");

  if (!discord) {
    alert("Please enter your Discord username or ID.");
    return;
  }

  btn.disabled = true;
  btn.innerText = "Submitting...";

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER RECEIVED**\n\n" +
        "📦 Product: Stacked TB3 Account ($8)\n" +
        "🆔 Order ID: " + order + "\n" +
        "👤 Discord: " + discord + "\n" +
        "📝 Extra Info: " + (notes || "None") + "\n\n" +
        "💰 Status: Awaiting payment verification"
    })
  })
  .then(() => {
    alert("Order sent! Complete payment and wait for delivery.");
    document.getElementById("discord").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("order").value = generateOrderId();
    btn.disabled = false;
    btn.innerText = "Submit Order";
  })
  .catch(() => {
    alert("Error submitting order. Try again.");
    btn.disabled = false;
    btn.innerText = "Submit Order";
  });
}
