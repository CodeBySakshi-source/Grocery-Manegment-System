let groceries = JSON.parse(localStorage.getItem('groceries')) || [];

function updateTable() {
  const tbody = document.getElementById('grocery-table-body');
  tbody.innerHTML = '';
  let totalCost = 0;

  groceries.forEach((item, index) => {
    const row = document.createElement('tr');
    const itemTotal = item.qty * item.price;
    totalCost += itemTotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>₹${item.price}</td>
      <td>₹${itemTotal}</td>
      <td>
        <button class="edit" onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('total-cost').innerText = `Total Cost: ₹${totalCost}`;
  localStorage.setItem('groceries', JSON.stringify(groceries));
}

document.getElementById('grocery-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('item-name').value.trim();
  const qty = parseInt(document.getElementById('item-qty').value);
  const price = parseFloat(document.getElementById('item-price').value);

  if (name && qty > 0 && price > 0) {
    groceries.push({ name, qty, price });
    updateTable();

    // Clear inputs
    this.reset();
  }
});

function deleteItem(index) {
  groceries.splice(index, 1);
  updateTable();
}

function editItem(index) {
  const item = groceries[index];

  document.getElementById('item-name').value = item.name;
  document.getElementById('item-qty').value = item.qty;
  document.getElementById('item-price').value = item.price;

  // Remove and re-add on submit
  groceries.splice(index, 1);
  updateTable();
}

// Initial table load
updateTable();
