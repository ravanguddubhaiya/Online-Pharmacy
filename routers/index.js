const express = require("express");
const customerRouter = require("./customer");
const medicineRouter = require("./medicine");

const rootRouter = express.Router();

rootRouter.use("/customer", customerRouter );
rootRouter.use("/medicines", medicineRouter);

module.exports = rootRouter;
