const express = require("express");
const {
  addMedicine,
  getListMedicine,
  getMedicineById,
  panigationMedicine,
  deleteMedicine,
  updateMedicine,
  getMedicineByCategory,
} = require("../../services/medicine");

const medicineRouter = express.Router();

medicineRouter.post("/", async (req, res) => {
  const {
    name,
    description,
    price,
    img1,
    medicinecategory,
  } = req.body;

  const newMedicine = await addMedicine({
    name,
    description,
    price,
    img1,
    medicinecategory,
  });

  if (!newMedicine) {
    return res.status(500).send("Can't add medicine");
  }

  res.status(200).send(newMedicine);
});

medicineRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const medicine = await getMedicineById(id);

  if (!medicine) {
    return res.status(500).send(`Can't get medicine id: ${id}`);
  }

  res.status(200).send(medicine);
});

medicineRouter.get("/", async (req, res) => {
  const listCustomer = await getListMedicine();

  if (!listCustomer) {
    return res.status(500).send("Can't get list customer");
  }
  res.status(200).send(listCustomer);
});

medicineRouter.get("/", async (req, res) => {
  console.log("HEllo");
  const page = Number.parseInt(req.query.page);
  const size = Number.parseInt(req.query.size);
  const keyWordSearch = req.query.search || "";
  const category = req.query.category || "";
  let medicine;

  if (page && size) {
    let start = (page - 1) * size;
    let end = page * size;

    if (category === "all") {
      medicine = await getListMedicine();
    } else {
      medicine = await getMedicineByCategory(category);
    }

    let panigationMedicine = medicine.slice(start, end);

    if (!keyWordSearch) {
      res.status(200).send(panigationMedicine);
    } else {
      let newMedicine = panigationMedicine.filter((value) => {
        return (
          value.name.toLowerCase().indexOf(keyWordSearch.toLowerCase()) !== -1
        );
      });
      res.status(200).send(newMedicine);
    }
  } else if (category || keyWordSearch) {
    if (category === "all") {
      medicine = await getListMedicine();
    } else {
      medicine = await getMedicineByCategory(category);
    }
    res.status(200).send(medicine);
  } else {
    const medicine = await getListProduct();
    if (!medicine) {
      return res.status(500).send("Can't get panigation page");
    }
    res.status(200).send(medicine);
  }
});

medicineRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    img,
    category,
  } = req.body;

  const isMedicineExist = getMedicineById(id);

  if (!isMedicineExist) {
    return res.status(500).send(`Medicine ${id} is not exists in db`);
  }

  const data = {
    name,
    description,
    price,
    img,
    category,
  };

  await updateMedicine(id, data);

  res.status(200).send(data);
});

medicineRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const isMedicineExist = getMedicineById(id);

  if (!isMedicineExist) {
    return res.status(500).send(`Medicine ${id} is not exists in db `);
  }

  const medicineDeleted = await deleteMedicine(id);

  res.status(200).send(`Medicine id : ${medicineDeleted} deleted successfully`);
});

module.exports = medicineRouter;
