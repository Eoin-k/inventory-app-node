const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const itemcontroller = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const manufacturerController = require("../controllers/manufacturerController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.listAllItems);
inventoryRouter.get("/additem", itemcontroller.getItemAttributes);
inventoryRouter.post("/additem", itemcontroller.addItem);

module.exports = inventoryRouter;
