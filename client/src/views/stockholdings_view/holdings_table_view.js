const PubSub = require('../../helpers/pub_sub.js');
const AppData = require('../../models/app_data.js');

const HoldingsTableView = function (container) {
  this.container = container;
  this.isAdding = null;

}

HoldingsTableView.prototype.bindEvents = function () {

};

HoldingsTableView.prototype.initializeTable = function (userData) {
this.renderHoldings(userData[0].holdings, this.container);
};

HoldingsTableView.prototype.renderHoldings = function (userData, pageBody) {

  this.generatePopupForm();

  const holdingsTable = document.createElement('table');
  holdingsTable.classList.add('holdings-table');
  this.container.appendChild(holdingsTable);

  const tableHeader = holdingsTable.insertRow(0);
  const nameHeader = tableHeader.insertCell(0);
  const valueHeader = tableHeader.insertCell(1);
  const currentValueHeader = tableHeader.insertCell(2);
  const sharesHeldHeader = tableHeader.insertCell(3);
  const profitLossHeader = tableHeader.insertCell(4);
  const addHeader = tableHeader.insertCell(5);
  const removeHeader = tableHeader.insertCell(6);

  const stockNames = [];
  const stockValues = [];
  const stockCurrentValue = [];
  const sharesHeld = [];
  const profitLoss = [];





  userData.forEach(function(stock) {
    stockValues.push(stock.investedValue);
    stockNames.push(stock.stock);
    sharesHeld.push(stock.noOfSharesHeld);
    profitLoss.push(stock.profitLoss);
    const row = holdingsTable.insertRow(1);
    tableHeader.classList.add('holdings-header');

    const stockNamesCell = row.insertCell(0);
    const stockValuesCell = row.insertCell(1);
    const stockCurrentValueCell = row.insertCell(2);
    const sharesHeldCell = row.insertCell(3);
    const profitLossCell = row.insertCell(4);
    const addCell = row.insertCell(5);
    const removeCell = row.insertCell(6);
    stockNamesCell.textContent = stock.stock;
    stockValuesCell.textContent = stock.investedValue;
    stockCurrentValueCell.textContent = 100;
    sharesHeldCell.textContent = stock.noOfSharesHeld;
    profitLossCell.textContent = stock.profitLoss;
    addCell.textContent = "Add";
    addCell.classList.add("indicator");
    removeCell.textContent = "Remove";
    removeCell.classList.add("indicator");
    addCell.addEventListener('click', (event) => {
      console.log("add button pressed");
      this.isAdding = "true";
      console.log(this.isAdding);
      togglePopup();
    });
    removeCell.addEventListener('click', (event) => {
      console.log("remove button pressed");
      this.isAdding = "false";
      console.log(this.isAdding);
      togglePopup();

    });
  });

  function togglePopup(){
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show")
  };

    nameHeader.textContent = "Stock";
    valueHeader.textContent = "Invested Value";
    currentValueHeader.textContent = "Current Price";
    sharesHeldHeader.textContent = "Volume";
    profitLossHeader.textContent = "Profit/Loss";
    addHeader.textContent = "Bought";
    removeHeader.textContent = "Sold";


};



HoldingsTableView.prototype.generatePopupForm = function (isAdding) {

  const container = document.createElement('div');
  container.classList.add("popup");
  const body = document.querySelector("#pageBody");
  body.appendChild(container);

  const span = document.createElement('span');
  span.id = "myPopup";
  span.classList.add("popuptext");
  span.textContent = "Please Register Your Stock Transaction";
  container.appendChild(span);

  const closeButton = document.createElement('button');
  closeButton.id = "close-button";
  closeButton.textContent = "X";
  closeButton.style.backgroundColor = "black";
  span.appendChild(closeButton);



  const form = document.createElement('form');

  const sharesBoughtText = document.createElement('div');
  sharesBoughtText.classList.add("input-text");
  if(this.isAdding === "true")
    sharesBoughtText.textContent = "Shares Bought";
  else
    sharesBoughtText.textContent = "Shares Sold";

  form.appendChild(sharesBoughtText);

  const sharesBoughtInput = document.createElement('input');
  sharesBoughtInput.setAttribute("type", "text");
  sharesBoughtInput.style.backgroundColor = "navy";
  sharesBoughtText.appendChild(sharesBoughtInput);


  const pricePaid = document.createElement('div');
  pricePaid.classList.add("input-text");
  pricePaid.textContent = "Stock Price";
  form.appendChild(pricePaid);

  const priceInput = document.createElement('input');
  priceInput.setAttribute("type", "text");
  priceInput.style.backgroundColor = "navy";
  pricePaid.appendChild(priceInput);

  const submitButton = document.createElement('button');
  submitButton.id = "submit-button";
  submitButton.textContent = "Submit";
  submitButton.style.backgroundColor = "navy";
  span.appendChild(submitButton);

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    this.submitNewStock(parseInt(priceInput.value), parseInt(sharesBoughtInput.value));
    span.classList.toggle("show")
    priceInput.value = "";
    sharesBoughtInput.value = "";
  });

  closeButton.addEventListener('click', (event) => {
    span.classList.toggle("show")
    priceInput.value = "";
    sharesBoughtInput.value = "";
  });

  span.appendChild(form);



};

HoldingsTableView.prototype.submitNewStock = function (priceInput, sharesBoughtInput) {
console.log(this.isAdding);
if(this.isAdding === "false")
  priceInput = (-1 * priceInput);
console.log(priceInput, sharesBoughtInput);
};



module.exports = HoldingsTableView;
