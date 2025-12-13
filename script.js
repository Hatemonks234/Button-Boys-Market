function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const order = document.getElementById("order").value.trim();

  if (!discord || !order) {
    alert("Please enter your Discord ID and Order ID.");
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
        "**Product:** Stacked TB3 Account ($8)\n" +
        "**Order ID:** " + order + "\n" +
        "**Discord:** " + discord + "\n\n" +
        "💰 Awaiting payment verification"
    })
  })
  .then(() => {
    alert("Order submitted! Please send proof in Discord.");
    document.getElementById("discord").value = "";
    document.getElementById("order").value = "";
  })
  .catch(() => {
    alert("Error sending order. Try again.");
  });
}
