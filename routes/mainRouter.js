const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const itemcontroller = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const manufacturerController = require("../controllers/manufacturerController");
const mainRouter = Router();

mainRouter.get("/", inventoryController.listAllItems);
mainRouter.get("/cat/:id", categoryController.listAllCatItems);
mainRouter.get("/additem", itemcontroller.getItemAttributes);
mainRouter.post("/additem", itemcontroller.addItem);
mainRouter.get(
	"/manufacturer/:id",
	manufacturerController.listManufacturerItems,
);

mainRouter.get(
	"/addmanufacturer",
	manufacturerController.renderNewManufacturerForm,
);
mainRouter.post("/addmanufacturer", manufacturerController.addManufacturer);

module.exports = mainRouter;
