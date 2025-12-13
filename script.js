// AUTO-GENERATE ORDER ID
window.onload = () => {
  const orderInput = document.getElementById("order");
  if (orderInput) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    orderInput.value = "TB3-" + randomNum;
  }
};

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const order = document.getElementById("order").value.trim();
  const note = document.getElementById("note")?.value.trim();

  if (!discord || !order) {
    alert("Please enter your Discord");
    return;
  }

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        "🧾 **NEW ORDER**\n\n" +
        "📦 **Product:** Stacked TB3 Account ($8)\n" +
        "🆔 **Order ID:** " + order + "\n" +
        "👤 **Discord:** " + discord + "\n" +
        (note ? "📝 **Note:** " + note + "\n" : "") +
        "\n💰 **Status:** Awaiting payment"
    })
  })
  .then(() => {
    alert("Order sent! Complete payment and DM proof.");
    document.getElementById("discord").value = "";
    if (note) document.getElementById("note").value = "";
  })
  .catch(() => {
    alert("Error sending order.");
  });
}

