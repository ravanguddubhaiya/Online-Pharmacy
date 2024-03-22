const express = require("express");
const customerRouter = require("./customer");
const medicineRouter = require("./medicine");
const historyRouter = require("./history");

const rootRouter = express.Router();

rootRouter.use("/customer", customerRouter );
rootRouter.use("/medicines", medicineRouter);
rootRouter.use("/history", historyRouter);

module.exports = rootRouter;
