const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticate, verifyTokenandAdmin } = require("../../middwares/auth");
const {
  comparePassword,
  hashPassword,
  genToken,
  genrefreshToken,
} = require("../../services/auth");
const {
  createCustomer,
  getCustomerByEmail,
  getListCustomer,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
} = require("../../services/customer");

const customerRouter = express.Router();

let refreshTokens = [];

customerRouter.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;

  const hashedPassword = await hashPassword(password);

  const customer = await createCustomer({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    phone,
  });

  if (!customer) {
    return res.status(500).send("Can't create Customer");
  }
  res.status(200).send(customer);
});

customerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const customer = await getCustomerByEmail(email);
  if (!customer) {
    return res.status(404).send("No User Found with this associated email!!!");
  }

  const isValidPassword = await comparePassword(password, customer.password);

  if (!isValidPassword) {
    return res.status(404).send("Wrong Password!!!");
  }

  if (customer && isValidPassword) {
    const token = await genToken({
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
    });

    const refresh = await genrefreshToken({
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
    });

    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    refreshTokens.push(refresh);
    const { password, ...others } = customer.dataValues;
    res.status(200).send({ ...others, token });
  }
});

customerRouter.get("/", [authenticate], async (req, res) => {
  const listCustomer = await getListCustomer();

  if (!listCustomer) {
    return res.status(500).send("Can't get list customer");
  }

  res.status(200).send(listCustomer);
});

customerRouter.delete(
  "/:id",
  [authenticate, verifyTokenandAdmin],
  async (req, res) => {
    const { id } = req.params;

    const idCustomerExist = await getUserById(id);

    if (!idCustomerExist) {
      return res.status(500).send(`Customer ${id} is not exist!`);
    }

    const customerDeleted = await deleteCustomer(id);

    res.status(200).send(`Customer id : ${customerDeleted} successfully`);
  }
);

customerRouter.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).send("You're not authenticate");
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send("Refresh token is not valid");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, async (err, customer) => {
    if (err) {
      console.log(err);
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = await genToken({
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
    });
    const newRefreshToken = await genrefreshToken({
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
    });

    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    res.status(200).send({ accessToken: newAccessToken });
  });
});

customerRouter.post("/logout", [authenticate], (req, res) => {
  res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.status(200).send("Log out is successfully");
});

customerRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, password } = req.body;

  const isExistCustomer = await getCustomerById(id);

  if (!isExistCustomer) {
    res.status(500).send("Customer is not exists in db");
  }

  const hashedPassword = await hashPassword(password);

  const data = { first_name, last_name, email, phone, password: hashedPassword };
  await updateCustomer(id, data);

  res.status(200).send(data);
});
module.exports = customerRouter;
