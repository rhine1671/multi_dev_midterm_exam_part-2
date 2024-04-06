document.addEventListener("DOMContentLoaded", function() {
  const addButtons = document.querySelectorAll(".btn-primary");
  const orderedItemsList = document.querySelector("#my-order");
  const payButton = document.querySelector("#pay-order .btn-primary");
  const totalDisplay = document.querySelector("#pay-order .money");
  let total = 0;
  let customerMoney = 0;

  // Add event listeners to "Add" buttons
  addButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      const card = event.target.closest(".card");
      const itemName = card.querySelector(".menu-items").textContent;
      const itemPrice = parseFloat(card.querySelector(".card-text").textContent.replace("Php ", ""));
      const quantity = parseInt(card.querySelector("#quantity").value);

      if (quantity > 0) {
        const subtotal = itemPrice * quantity;
        total += subtotal;
        const orderedItem = `${itemName} (Qty: ${quantity})`;
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = orderedItem;
        orderedItemsList.appendChild(li);
        updateTotal();
        
      }
    });
  });

// Function to update total display
function updateTotal() {
  totalDisplay.textContent = `Total: Php ${total.toFixed(2)}`;
}

  // Payment function
function makePayment() {
  const inputField = document.querySelector("#input-field");
  const inputValue = parseFloat(inputField.value);
  

  if (!isNaN(inputValue) && inputValue >= total) {
    customerMoney = inputValue;
    const change = customerMoney - total;
    alert(`Payment successful! Your change is Php ${change.toFixed(2)}`);
    // Reset total and ordered items list
    total = 0;
    updateTotal();
    orderedItemsList.innerHTML = "";
    inputField.value = "";
  } else {
    alert("Insufficient amount. Please enter a valid amount equal to or greater than the total.");
  } 
}

// Add event listener to pay button
payButton.addEventListener("click", function(event) {
  event.preventDefault();
  makePayment();
});

  
});
