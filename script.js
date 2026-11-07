
const photo = document.getElementById("photo");
const preview = document.getElementById("preview");
const previewText = document.getElementById("previewText");

const printSize = document.getElementById("printSize");
const quantity = document.getElementById("quantity");

const printCost = document.getElementById("printCost");
const totalPrice = document.getElementById("totalPrice");

const deliveryCharge = 40;

// Price for each print size
const prices = {
    "4x6": 10,
    "5x7": 20,
    "A4": 30
};

// Photo upload and preview
photo.addEventListener("change", function() {

    const file = photo.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please upload an image file!");
        photo.value = "";
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert("Photo must be smaller than 10 MB!");
        photo.value = "";
        return;
    }

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
    previewText.style.display = "none";
});

// Calculate price
function calculatePrice() {

    const size = printSize.value;
    const copies = Number(quantity.value);

    const price = prices[size];
    const printingTotal = price * copies;

    const delivery = deliveryCharge;
    const finalTotal = printingTotal + delivery;

    printCost.textContent = printingTotal;
    document.getElementById("deliveryCost").textContent = delivery;
    totalPrice.textContent = finalTotal;
}

// Update price when size or quantity changes
printSize.addEventListener("change", calculatePrice);
quantity.addEventListener("input", calculatePrice);

// Place order
document.getElementById("orderForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const customer = document.getElementById("customerName")
        .value.trim();

    const phone = document.getElementById("phone").value;

    const address = document.getElementById("address")
        .value.trim();

    const file = photo.files[0];

    if (!file) {
        alert("Please upload your photo!");
        return;
    }

    const copies = Number(quantity.value);

    if (!Number.isInteger(copies) || copies < 1 || copies > 100) {
        alert("Please select between 1 and 100 copies.");
        return;
    }

    const size = printSize.value;
    const amount = Number(totalPrice.textContent);

    const confirmation = document.getElementById("confirmation");

    confirmation.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = "Order Details";

    const details = document.createElement("p");
    details.textContent =
        "Customer: " + customer +
        " | Phone: " + phone +
        " | Size: " + size +
        " | Copies: " + copies +
        " | Total: ₹" + amount;

    const addressText = document.createElement("p");
    addressText.textContent = "Address: " + address;

    const notice = document.createElement("p");
    notice.textContent =
        "Demo order created! Connect a backend to receive and process real customer orders.";

    confirmation.append(heading, details, addressText, notice);

    confirmation.scrollIntoView({ behavior: "smooth" });
});

// Initial price
calculatePrice();
