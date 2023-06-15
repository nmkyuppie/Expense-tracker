function addItem() {
  const date = document.getElementById("currentDate");
  const amount = document.getElementById("amount");
  const name = document.getElementById("expenseType");

  let smallLetters = [..."abcdefghijklmnopqrstuvwxyz"];
  let capitalLetters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  let numbers = [..."0123456789"];

  let array = [...smallLetters, ...capitalLetters, ...numbers];

  let uniqueId = "";

  for (i = 0; i < 10; i++) {
    let output = Math.floor(Math.random() * array.length);
    let character = array[output];
    uniqueId += character;
  }

  let item = { date: date.value, amount: amount.value, name: name.value, id: uniqueId };

  pushItem(item);

  display();

  date.value = "";
  amount.value = "";
  name.value = "";
}

const pushItem = (item) => {
  let expenseItems = JSON.parse(localStorage.getItem("expense")) ?? [];
  expenseItems.push(item);
  localStorage.setItem("expense", JSON.stringify(expenseItems));
};

function display() {
  document.getElementById('currentDate').valueAsDate = new Date();
  let expenseItems = JSON.parse(localStorage.getItem("expense")) ?? [];
  let html = "";
  for (let i = 0; i < expenseItems.length; i++) {
    html += `<tr><td>${expenseItems[i].date}</td><td>${expenseItems[i].amount}</td><td>${expenseItems[i].name}</td>
      <td><button class="btn btn-outline-primary"onclick="deleteExpense('${expenseItems[i].id}')">Delete</button></td><td><button class="btn btn-outline-primary" onclick="editExpense('${expenseItems[i].id}')">Edit</button></td></tr>`;
  }

  document.getElementById("data").innerHTML = html;

  totalAmount();
}

const totalAmount = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const expenseItems = JSON.parse(localStorage.getItem("expense")) ?? [];
  const monthMap = new Map();

  for (let i = 0; i < expenseItems.length; i++) {
    const item = expenseItems[i];
    const date = new Date(item.date);
    const month = months[date.getMonth()];
    const amount = parseInt(item.amount);

    if (monthMap.has(month)) {
      const currentAmount = parseInt(monthMap.get(month)) + amount;
      monthMap.set(month, currentAmount);
    } else {
      monthMap.set(month, amount);
    }

    let html = "";

    for (let i = 0; i < months.length; i++) {
      const monthName = months[i];
      const amount = monthMap.get(monthName);
      if (amount !== undefined) {
        html += `<tr><td>${monthName}</td><td>${amount}</td></tr>`;
      }
    }

    document.getElementById("monthlyTotal").innerHTML = html;
  }
};

function deleteExpense(id) {
  let expenseItems = JSON.parse(localStorage.getItem("expense")) ?? [];
  expenseItems = expenseItems.filter((item) => item.id !== id);
  localStorage.setItem("expense", JSON.stringify(expenseItems));
  display();
}

function editExpense(id) {
  let expenseItems = JSON.parse(localStorage.getItem("expense")) ?? [];
  const item = expenseItems.find((i) => i.id === id);

  if (item) {
    const date = document.getElementById("currentDate");
    const amount = document.getElementById("amount");
    const name = document.getElementById("expenseType");

    date.value = item.date;
    amount.value = item.amount;
    name.value = item.name;

    document.getElementById("expenseId").value = id;
  }
}

function saveItem() {
  const id = document.getElementById("expenseId").value;
  const date = document.getElementById("currentDate").value;
  const amount = document.getElementById("amount").value;
  const name = document.getElementById("expenseType").value;

  let expenseItems = JSON.parse(localStorage.getItem("expense")) ?? [];

  const item = expenseItems.find((item) => item.id === id);

  if (item) {
    item.date = date;
    item.amount = amount;
    item.name = name;

    localStorage.setItem("expense", JSON.stringify(expenseItems));

    display();
  }

  document.getElementById("currentDate").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("expenseType").value = "";
  document.getElementById("expenseId").value = "";
}
