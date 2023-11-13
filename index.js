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
  axios
    .post(
      "https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails",
      obj
    )
    .then((res) => {
      const id = res.data._id;
      createTable(itemname, description, price, quantity, id);
    })
    .catch((er) => console.log(er));
});

function tableStyling(
  itemnameCell,
  descriptionCell,
  priceCell,
  quantityCell,
  tableRow
) {
  itemnameCell.style.padding = "0px 120px";
  descriptionCell.style.padding = "10px 80px";
  priceCell.style.padding = "10px 80px";
  quantityCell.style.padding = "10px 80px";
  itemnameCell.style.border = "1px solid #880e4f";
  itemnameCell.style.borderRadius = "10px";
  itemnameCell.style.backgroundColor = "#fff";
  descriptionCell.style.border = "1px solid #880e4f";
  descriptionCell.style.border = "1px solid #880e4f";
  descriptionCell.style.borderRadius = "10px";
  descriptionCell.style.backgroundColor = "#fff";
  descriptionCell.style.border = "1px solid #880e4f";
  priceCell.style.border = "1px solid #880e4f";
  priceCell.style.borderRadius = "10px";
  priceCell.style.backgroundColor = "#fff";
  priceCell.style.border = "1px solid #880e4f";
  quantityCell.style.border = "1px solid #880e4f";
  quantityCell.style.borderRadius = "10px";
  quantityCell.style.backgroundColor = "#fff";
  quantityCell.style.border = "1px solid #880e4f";
  tableRow.appendChild(itemnameCell);
  tableRow.appendChild(descriptionCell);
  tableRow.appendChild(priceCell);
  tableRow.appendChild(quantityCell);
}

function buttonStyling(btn) {
  btn.style.fontSize = "22px";
  btn.style.backgroundColor = "#880e4f";
  btn.style.border = "1px solid #880e4f";
  btn.style.borderRadius = "10px";
  btn.style.padding = "10px 40px";
  btn.style.margin = "10px";
  btn.style.color = "#e0e0e0";
}

function createTable(itemname, description, price, quantity, id) {
  const tableRow = document.createElement("tr");
  const itemnameCell = document.createElement("td");
  const descriptionCell = document.createElement("td");
  const priceCell = document.createElement("td");
  const quantityCell = document.createElement("td");
  itemnameCell.textContent = itemname;
  descriptionCell.textContent = description;
  priceCell.textContent = price;
  quantityCell.textContent = quantity;
  tableStyling(
    itemnameCell,
    descriptionCell,
    priceCell,
    quantityCell,
    tableRow
  );
  const btn1 = document.createElement("button");
  btn1.textContent = "Buy1";
  buttonStyling(btn1);
  btn1.addEventListener("click", () => {
    axios
      .get(
        `https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails/${id}`
      )
      .then((res) => {
        res.data.quantity--;
        let obj = res.data;
        axios
          .put(
            `https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails/${obj._id}`,
            {
              obj,
            }
          )
          .then((res) => console.log("object updated successfully"))
          .catch((er) => console.log(er));
      })
      .catch((er) => console.log(er));

    let val = tableRow.querySelector("td:nth-child(4").textContent;
    if (val > 1) {
      val--;
      tableRow.querySelector("td:nth-child(4").textContent = val;
    } else {
      deleteItem(id, tableRow);
    }
  });

  const btn2 = document.createElement("button");
  btn2.textContent = "Buy2";
  buttonStyling(btn2);
  btn2.addEventListener("click", () => {
    axios
      .get(
        `https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails/${id}`
      )
      .then((res) => {
        res.data.quantity = res.data.quantity - 2;
        let obj = res.data;
        axios
          .put(
            `https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails/${obj._id}`,
            {
              obj,
            }
          )
          .then((res) => console.log("object updated successfully"))
          .catch((er) => console.log(er));
      })
      .catch((er) => console.log(er));
    let val = tableRow.querySelector("td:nth-child(4)").textContent;
    if (val > 2) {
      val = val - 2;
      tableRow.querySelector("td:nth-child(4)").textContent = val;
    } else {
      alert("unable to buy two products");
    }
  });

  const btn3 = document.createElement("button");
  btn3.textContent = "Buy3";
  buttonStyling(btn3);
  btn3.addEventListener("click", () => {
    axios
      .get(
        `https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails/${id}`
      )
      .then((res) => {
        res.data.quantity = res.data.quantity - 3;
        let obj = res.data;
        axios
          .put(
            `https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails/${obj._id}`,
            {
              obj,
            }
          )
          .then((res) => console.log("object updated successfully"))
          .catch((er) => console.log(er));
      })
      .catch((er) => console.log(er));

    let val = tableRow.querySelector("td:nth-child(4)").textContent;
    if (val > 3) {
      val = val - 3;
      tableRow.querySelector("td:nth-child(4)").textContent = val;
    } else {
      alert("unable to buy three products");
    }
  });

  tableRow.appendChild(btn1);
  tableRow.appendChild(btn2);
  tableRow.appendChild(btn3);
  tableRow.style.textAlign = "center";
  store.appendChild(tableRow);
}

function deleteItem(id, tableRow) {
  tableRow.remove();
  axios
    .delete(
      `https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails/${id}`
    )
    .then((res) => {
      console.log("object deleted from cloud");
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("load", () => {
  axios
    .get(
      "https://crudcrud.com/api/9b8ff8f2aef7418fb8f04c1d2d9f6545/storedetails"
    )
    .then((res) => {
      res.data.forEach((val) => {
        createTable(
          val.itemname,
          val.description,
          val.price,
          val.quantity,
          val._id
        );
      });
    })
    .catch((err) => console.log("Store is empty"));
});
