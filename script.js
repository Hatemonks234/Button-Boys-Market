function deliverOrder() {
  const orderId = document.getElementById("adminOrderId").value.trim();
  const discord = document.getElementById("adminDiscord").value.trim();
  const notes = document.getElementById("adminNotes").value.trim();

  if (!orderId || !discord) {
    alert("Order ID and Discord are required");
    return;
  }

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content:
        "✅ **ORDER DELIVERED**\n\n" +
        "🆔 **Order ID:** " + orderId + "\n" +
        "👤 **Discord:** " + discord + "\n\n" +
        "📦 **Delivery Notes:**\n" +
        (notes || "No notes provided")
    })
  })
  .then(() => {
    alert("Order marked as delivered!");
    document.getElementById("adminOrderId").value = "";
    document.getElementById("adminDiscord").value = "";
    document.getElementById("adminNotes").value = "";
  })
  .catch(() => {
    alert("Failed to send delivery message");
  });
}


