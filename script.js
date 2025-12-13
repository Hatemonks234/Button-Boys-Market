// AUTO GENERATE ORDER ID
const orderIdInput = document.getElementById("orderId");
const generatedId = "TB3-" + Math.floor(100000 + Math.random() * 900000);
orderIdInput.value = generatedId;

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const orderId = document.getElementById("orderId").value;

  if (!discord) {
    alert("Please enter your Discord");
    return;
  }

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER RECEIVED**\n\n" +
        "📦 **Product:** Stacked TB3 Account ($8)\n" +
        "🆔 **Order ID:** " + orderId + "\n" +
        "👤 **Discord:** " + discord + "\n" +
        "📝 **Notes:** " + (notes || "None") + "\n\n" +
        "💰 **Payment:** Cash App / Venmo\n" +
        "⏳ **Status:** Awaiting payment verification"
    })
  })
  .then(() => {
    alert("Order sent! Pay, then send proof on Discord.");
    document.getElementById("discord").value = "";
    document.getElementById("notes").value = "";
  })
  .catch(() => {
    alert("Error sending order. Try again.");
  });
}

