// AUTO GENERATE ORDER ID
window.onload = () => {
  const orderInput = document.getElementById("order");
  if (orderInput) {
    const id = "TB3-" + Math.floor(100000 + Math.random() * 900000);
    orderInput.value = id;
  }
};

function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const order = document.getElementById("order").value.trim();
  const note = document.getElementById("note").value.trim();

  if (!discord) {
    alert("Please enter your Discord username");
    return;
  }

  fetch("https://discord.com/api/webhooks/1448939295371952169/qcxOs6b4mX4CwQTz03qWolCSgk8x7qauxbza3MVFqIVU8a32x_lzQ5t0X_d14aSzW3nL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content:
        "🧾 **NEW TB3 ORDER**\n\n" +
        "📦 **Product:** Stacked TB3 Account ($8)\n" +
        "🆔 **Order ID:** " + order + "\n" +
        "👤 **Discord:** " + discord + "\n" +
        (note ? "📝 **Note:** " + note + "\n" : "") +
        "\n💰 **Status:** Awaiting payment proof"
    })
  })
  .then(() => {
    alert("Order submitted! Please pay and send proof on Discord.");
    document.getElementById("discord").value = "";
    document.getElementById("note").value = "";
  })
  .catch(() => {
    alert("Something went wrong. Try again.");
  });
}
