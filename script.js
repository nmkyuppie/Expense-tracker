let expenseItems = [];
function addItem() {


  let id = "";

  const date = document.getElementById("Currentdate");
  const amount = document.getElementById("Amount");
  const name = document.getElementById("Name");



  let smallletter = [...'abcdefghijklmnopqrstuvwxyz'];
  let capitalLetters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  let numbers = [...'0123456789'];

  let Array = [...smallletter, ...capitalLetters, ...numbers];

  for (i = 0; i < 10; i++) {

    let output = Math.floor(Math.random() * Array.length);
    let arr = Array[output]
    id += arr
  }


  let item = { date: date.value, amount: amount.value, name: name.value, id: id };

  expenseItems = JSON.parse(localStorage.getItem('expense')) ?? [];
  expenseItems.push(item);
  localStorage.setItem('expense', JSON.stringify(expenseItems));

  display(expenseItems);

  totalAmount();


  date.value = '';
  amount.value = '';
  name.value = '';
}




function display(expenseItems) {


  let html = '';
  for (let i = 0; i < expenseItems.length; i++) {
    html += `<tr><td>${expenseItems[i].date}</td><td>${expenseItems[i].amount}</td><td>${expenseItems[i].name}</td>
      <td><button onclick="deleteExpense('${expenseItems[i].id}')">Delete</button></td><td><button onclick="EditExpense('${expenseItems[i].id}')">Edit</button></td></tr>`;
  }

  document.getElementById('data').innerHTML = html;

}



const totalAmount = () => {
  const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


  const expenseItems = JSON.parse(localStorage.getItem('expense')) ?? [];
  const myMap = new Map();

  for (let i = 0; i < expenseItems.length; i++) {
    const item = expenseItems[i];
    const d = new Date(item.date);
    const monname = month[d.getMonth()];
    const value = parseInt(item.amount);

    if (myMap.has(monname)) {
      const currentamount = parseInt(myMap.get(monname)) + value;

      myMap.set(monname, currentamount);
    } else {
      myMap.set(monname, value);
    }

    let html = '';

    for (let i = 0; i < month.length; i++) {

      const monthName = month[i];

      const amount = myMap.get(monthName);

      if (amount !== undefined)

        html += `<tr><td>${monthName}</td><td>${amount}</td></tr>`;
    }

    document.getElementById('monthlyTotal').innerHTML = html;

  }

}


function deleteExpense(id) {
  let expenseItems = JSON.parse(localStorage.getItem('expense')) ?? [];

  const filter = expenseItems.filter(item => item.id !== id);
  expenseItems = filter;
  localStorage.setItem('expense', JSON.stringify(expenseItems));
  display(expenseItems);
  totalAmount();
}




function EditExpense(id) {

  console.log('ID:', id);
  let expenseItems = JSON.parse(localStorage.getItem('expense')) ?? [];


  const foundItem = expenseItems.find(item => item.id === id);

  console.log(foundItem)

  if (foundItem) {

    const date = document.getElementById("Currentdate");
    const amount = document.getElementById("Amount");
    const name = document.getElementById("Name");

    date.value = foundItem.date;


    amount.value = foundItem.amount;

    name.value = foundItem.name;

    document.getElementById("editExpenseId").value = id;

    localStorage.setItem('expense', JSON.stringify(expenseItems));



    display(expenseItems);
    totalAmount();
  }

}

function saveItem() {
  const id = document.getElementById("editExpenseId").value;
  const date = document.getElementById("Currentdate").value;
  const amount = document.getElementById("Amount").value;
  const name = document.getElementById("Name").value;

  let expenseItems = JSON.parse(localStorage.getItem('expense')) ?? [];

  const foundItem = expenseItems.find(item => item.id === id);

  if (foundItem) {
    foundItem.date = date;
    foundItem.amount = amount;
    foundItem.name = name;

    localStorage.setItem('expense', JSON.stringify(expenseItems));

    display(expenseItems);
    totalAmount();
  }

  document.getElementById("Currentdate").value = '';
  document.getElementById("Amount").value = '';
  document.getElementById("Name").value = '';
  document.getElementById("editExpenseId").value = '';

}














