const express = require("express");
const {
  gethistory,
  createHistory,
  getListHistory,
} = require("../../services/history");
const historyRouter = express.Router();

historyRouter.get("/", async (req, res) => {

  const { idCustomer } = req.query;

  if (idCustomer) {
    const customer = await gethistory(idCustomer);
    if (!customer) {
      return res.status(500).send("Can't get customer history");
    }
    res.status(200).send(customer);
  } else {
    const listHistory = await getListHistory();
    if (!listHistory) {
      return res.status(500).send("Can't get list history");
    }

    res.status(200).send(listHistory);
  }
});

historyRouter.post("/", async (req, res) => {
  const { idCustomer, phone, address, fullname, total, card_number, valid_date, cvv } = req.body;
  const medicineid = req.body.cart.medicine.id;
  const quantity = req.body.cart.quantity;
  const history = await createHistory({
    idCustomer,
    phone,
    address,
    medicineid,
    quantity,
    fullname,
    card_number,
    cvv,
    valid_date,
    total,
  });

  if (!history) {
    return res.status(500).send("Can't create history");
  }

  res.status(200).send(history);
});

module.exports = historyRouter;
