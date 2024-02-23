const { verifyToken } = require("../../services/auth");
const { getCustomerById } = require("../../services/customer");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      const data = await verifyToken(accessToken);
      const customer = await getCustomerById(data.id);

      if (!customer) {
        return res.status(403).send("Token is not valid");
      }
      req.customer = customer;
      next();
    }
  } catch (err) {
    return res.status(401).send("You're not authenticated");
  }
};

const verifyTokenandAdmin = (req, res, next) => {
  const customer = req.customer;
  const { id } = req.params;

  if (customer.id === id || customer.admin) {
    next();
  } else {
    res.status(403).send("You're not allowed to delete others");
  }
};

module.exports = {
  authenticate,
  verifyTokenandAdmin,
};
