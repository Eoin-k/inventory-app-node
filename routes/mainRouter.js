const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const manufacturerController = require("../controllers/manufacturerController");
const mainRouter = Router();

mainRouter.get("/", inventoryController.listAllItems);
mainRouter.get("/cat/:id", categoryController.listAllCatItems);
mainRouter.get("/additem", itemController.getItemAttributes);
mainRouter.get("/item/:id", itemController.getSingleItem);
mainRouter.get(
	"/manufacturer/:id",
	manufacturerController.listManufacturerItems,
);

mainRouter.get(
	"/addmanufacturer",
	manufacturerController.renderNewManufacturerForm,
);
mainRouter.get("/addcategory", categoryController.renderNewCategoryform);
mainRouter.post("/additem", itemController.addItem);
mainRouter.post("/addmanufacturer", manufacturerController.addManufacturer);
mainRouter.post("/item/:id", itemController.updateItem);
mainRouter.post("/addcategory", categoryController.addCategory);
mainRouter.post("/deletecat/:id", categoryController.deleteCategory);
mainRouter.post("/deleteitem/:id", itemController.deleteItem);
mainRouter.post(
	"/deletemanufacturer/:id",
	manufacturerController.deleteManufacturer,
);

module.exports = mainRouter;
