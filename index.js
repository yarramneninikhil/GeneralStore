const store = document.querySelector(".store");
const form = document.querySelector("#myform");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemname = document.querySelector("#itemname").value;
  const description = document.querySelector("#description").value;
  const price = document.querySelector("#price").value;
  const quantity = document.querySelector("#quantity").value;
  const obj = {
    itemname,
    description,
    price,
    quantity,
  };
  async function postData(obj) {
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/c5b8a1ef69ff42a7a6b51ceec1caf817/storedetails",
        obj
      );
      displayData(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  postData(obj);
});

function displayData(obj) {
  const tablerow = document.createElement("tr");
  const itemnameCell = document.createElement("td");
  const descriptionCell = document.createElement("td");
  const priceCell = document.createElement("td");
  const quantityCell = document.createElement("td");
  itemnameCell.textContent = obj.itemname;
  descriptionCell.textContent = obj.description;
  priceCell.textContent = obj.price;
  quantityCell.textContent = obj.quantity;
  tablerow.append(itemnameCell);
  tablerow.append(descriptionCell);
  tablerow.append(priceCell);
  tablerow.append(quantityCell);
  const btn1 = document.createElement("button");
  btn1.textContent = "Buy1";
  tablerow.append(btn1);
  btn1.addEventListener("click", () => {
    let value = 1;
    if (obj.quantity > value) {
      updateData(obj, obj._id, value, quantityCell);
    } else {
      tablerow.remove();
      deleteData(obj._id);
    }
  });
  const btn2 = document.createElement("button");
  btn2.textContent = "Buy2";
  tablerow.append(btn2);
  btn2.addEventListener("click", () => {
    let value = 2;
    if (obj.quantity > value) {
      updateData(obj, obj._id, value, quantityCell);
    } else if (obj.quantity < value) {
      alert("cannot buy two products");
    } else {
      tablerow.remove();
      deleteData(obj._id);
    }
  });
  const btn3 = document.createElement("button");
  btn3.textContent = "Buy3";
  tablerow.append(btn3);
  btn3.addEventListener("click", () => {
    let value = 3;
    if (obj.quantity > value) {
      updateData(obj, obj._id, value, quantityCell);
    } else if (obj.quantity < value) {
      alert("cannot buy three products");
    } else {
      tablerow.remove();
      deleteData(obj._id);
    }
  });
  store.append(tablerow);
}

async function updateData(obj, id, value, quantityCell) {
  obj.quantity = obj.quantity - value;
  quantityCell.textContent = obj.quantity;
  const newobj = {
    itemname: obj.itemname,
    description: obj.description,
    price: obj.price,
    quantity: obj.quantity,
  };

  try {
    const res = await axios.put(
      `https://crudcrud.com/api/c5b8a1ef69ff42a7a6b51ceec1caf817/storedetails/${id}`,
      newobj
    );
    console.log(res);
  } catch (er) {
    console.log(er);
  }
}

async function deleteData(id) {
  try {
    const res = await axios.delete(
      `https://crudcrud.com/api/c5b8a1ef69ff42a7a6b51ceec1caf817/storedetails/${id}`
    );
    console.log("Object deleted successfully");
  } catch (er) {
    console.log(er);
  }
}

window.addEventListener("load", () => {
  async function fetch() {
    try {
      const res = await axios.get(
        "https://crudcrud.com/api/c5b8a1ef69ff42a7a6b51ceec1caf817/storedetails"
      );
      res.data.forEach((item) => {
        displayData(item);
      });
    } catch (err) {
      console.log(err);
    }
  }
  fetch();
});
