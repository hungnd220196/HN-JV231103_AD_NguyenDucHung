var cards = [];

function saveCard() {
  var cardNumber = document.getElementById("cardNumber").value;
  var expiryDate = document.getElementById("expiryDate").value;
  var cvv = document.getElementById("cvv").value;
  var cardImage = document.getElementById("cardImage").value;

  if (
    !validateCardNumber(cardNumber) ||
    !validateExpiryDate(expiryDate) ||
    !validateCVV(cvv)
  ) {
    console.log("Đâu vào không hợp lệ. Vui lòng kiểm tra chi tiết thẻ của bạn.");
    return;
  }

  var card = {
    cardNumber: cardNumber,
    maskedCardNumber: maskCardNumber(cardNumber),
    expiryDate: expiryDate,
    maskedCVV: maskCVV(cvv),
    cardImage: cardImage,
  };

  cards.push(card);

  updateCardList();

  clearForm();
}

function updateCardList() {
  var cardList = document.getElementById("card-list");
  cardList.innerHTML = "";

  cards.forEach(function (card, index) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `
            Card Number: ${card.maskedCardNumber} <br>
            Expiry Date: ${card.expiryDate} <br>
            CVV: ${card.maskedCVV} <br>
            Card Image: <img src="${card.cardImage}" alt="Card Image">
            <button onclick="deleteCard(${index})">Delete</button>
            <button onclick="editCard(${index})">Edit</button>
            <button onclick="viewCard(${index})">View</button>
        `;
    cardList.appendChild(listItem);
  });
}

function deleteCard(index) {
  cards.splice(index, 1);
  updateCardList();
}

function editCard(index) {
  var card = cards[index];

  document.getElementById("cardNumber").value = card.cardNumber;
  document.getElementById("expiryDate").value = card.expiryDate;
  document.getElementById("cvv").value = "";

  cards.splice(index, 1);

  updateCardList();
}

function viewCard(index) {
  var card = cards[index];

  alert(`
        Card Number: ${card.cardNumber} \n
        Expiry Date: ${card.expiryDate} \n
        CVV: ${card.maskedCVV}
    `);
}

function clearForm() {
  document.getElementById("cardNumber").value = "";
  document.getElementById("expiryDate").value = "";
  document.getElementById("cvv").value = "";
}

function validateCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber);
}

function validateExpiryDate(expiryDate) {
  var dateRegex = /^(0[1-9]|1[0-2])\/20\d{2}$/;
  return dateRegex.test(expiryDate);
}

function validateCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

function maskCardNumber(cardNumber) {
  return cardNumber.replace(/^(\d{6})\d{6}(\d{4})$/, "$1******$2");
}

function maskCVV(cvv) {
  return "*".repeat(cvv.length);
}

updateCardList();
