const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const itemcontroller = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const manufacturerController = require("../controllers/manufacturerController");
const mainRouter = Router();

mainRouter.get("/", inventoryController.listAllItems);
mainRouter.get("/cat/:id", categoryController.listAllCatItems);
mainRouter.get("/additem", itemcontroller.getItemAttributes);
mainRouter.get("/item/:id", itemcontroller.getSingleItem);
mainRouter.get(
	"/manufacturer/:id",
	manufacturerController.listManufacturerItems,
);

mainRouter.get(
	"/addmanufacturer",
	manufacturerController.renderNewManufacturerForm,
);
mainRouter.get("/addcategory", categoryController.renderNewCategoryform);
mainRouter.post("/additem", itemcontroller.addItem);
mainRouter.post("/addmanufacturer", manufacturerController.addManufacturer);
mainRouter.post("/item/:id", itemcontroller.updateItem);
mainRouter.post("/addcategory", categoryController.addCategory);
mainRouter.post("/deletecat/:id", categoryController.deleteCategory);

module.exports = mainRouter;
