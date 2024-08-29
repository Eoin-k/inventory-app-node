const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateNewItem = [
	body("itemname").isLength({ min: 1 }).withMessage("item name is invalid"),
	body("itemqty")
		.isNumeric()
		.isInt()
		.withMessage("please select a positive item quantity"),
	body("itemimage").isURL(),
];

getItemAttributes = async (req, res) => {
	try {
		const categories = await db.getAllCats();
		const manufacturers = await db.getManufacturers();
		res.render("addItem", {
			manufacturers: manufacturers,
			categories: categories,
		});
	} catch (err) {
		console.error(err);
	}
};

addItem = [
	validateNewItem,
	async (req, res) => {
		console.log("made it to add item");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const categories = await db.getAllCats();
			const manufacturers = await db.getManufacturers();
			return res.status(400).render("additem", {
				errors: errors.array(),
				manufacturers: manufacturers,
				categories: categories,
			});
		}
		const { itemname, itemqty, itemimage, manufacturer, category } = req.body;

		await db.addItemToDb({
			itemname,
			itemqty,
			itemimage,
			manufacturer,
			category,
		});
		res.redirect("/");
	},
];

module.exports = {
	getItemAttributes,
	addItem,
};
