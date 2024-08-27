const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const addNewItemcontroller = require("../controllers/addNewItemController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.listAllItems);
inventoryRouter.get("/additem", addNewItemcontroller.getManufacturers);

module.exports = inventoryRouter;
