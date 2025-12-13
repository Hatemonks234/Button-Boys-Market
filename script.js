function submitOrder() {
  const discord = document.getElementById("discord").value;
  const order = document.getElementById("order").value;

  if (!discord || !order) {
    alert("Fill out all fields");
    return;
  }

  alert(
    "Order submitted!\n\n" +
    "Discord ID: " + discord +
    "\nOrder ID: " + order +
    "\n\nSend payment and wait for delivery."
  );
}
