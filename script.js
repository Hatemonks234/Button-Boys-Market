// ===== CONFIG =====
let STOCK_KEY = "tb3_stock";
let DEFAULT_STOCK = 10; // CHANGE THIS NUMBER ANYTIME

// ===== INIT =====
if (!localStorage.getItem(STOCK_KEY)) {
  localStorage.setItem(STOCK_KEY, DEFAULT_STOCK);
}

let stock = parseInt(localStorage.getItem(STOCK_KEY));
const stockText = document.getElementById("stockText");
const submitBtn = document.getElementById("submitBtn");

// Generate Order ID
const orderIdInput = document.getElementById("orderId");
orderIdInput.value = "TB3-" + Math.floor(100000 + Math.random() * 900000);

// Update Stock UI
function updateStockUI() {
  if (stock > 0) {
    stockText.textContent = "In Stock (" + stock + " available)";
    submitBtn.disabled = false;
  } else {
    stockText.textContent = "Sold Out";
    submitBtn.disabled = true;
  }
}
updateStockUI();

// ===== SUBMIT ORDER =====
function submitOrder() {
  const discord = document.getElementById("discord").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const orderId = orderIdInput.value;

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
        "🆔 **Order ID:** " + orderId + "\n" +
        "👤 **Discord:** " + discord + "\n" +
        "📝 **Notes:** " + (notes || "None") + "\n\n" +
        "💰 **Payment:** Cash App / Venmo\n" +
        "⏳ **Status:** Awaiting payment verification"
    })
  }).then(() => {
    stock--;
    localStorage.setItem(STOCK_KEY, stock);
    showConfirmation(orderId);
  }).catch(() => {
    alert("Error submitting order");
  });
}

// ===== CONFIRMATION SCREEN =====
function showConfirmation(orderId) {
  document.body.innerHTML = `
    <div style="
      min-height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background:#eef7ff;
      font-family:Arial;
    ">
      <div style="
        background:white;
        padding:30px;
        border-radius:12px;
        max-width:400px;
        text-align:center;
      ">
        <h2>✅ Order Submitted</h2>
        <p><strong>Order ID:</strong></p>
        <p style="font-size:18px">${orderId}</p>

        <button onclick="navigator.clipboard.writeText('${orderId}')"
          style="margin-top:10px;padding:10px;width:100%;
          background:#4faaff;color:white;border:none;border-radius:8px;">
          Copy Order ID
        </button>

        <p style="margin-top:15px;font-size:14px;">
          Pay & send proof + Order ID on Discord
        </p>

        <a href="https://discord.gg/YOURSERVER" target="_blank">
          Join Discord
        </a>
      </div>
    </div>
  `;
}

