function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const order = document.getElementById("order").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!discord || !order) {
    alert("Please enter your Discord and Order ID");
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
        "🆔 **Order ID:** " + order + "\n" +
        "👤 **Discord:** " + discord + "\n" +
        "📝 **Extra Notes:** " + (notes || "None") + "\n\n" +
        "☐ Payment Confirmed\n" +
        "☐ Account Delivered\n" +
        "☐ Order Completed"
    })
  })
  .then(() => {
    alert("Order submitted! Please complete payment and wait for Discord DM.");
    document.getElementById("discord").value = "";
    document.getElementById("order").value = "";
    document.getElementById("notes").value = "";
  })
  .catch(() => {
    alert("Error submitting order. Please try again.");
  });
}
