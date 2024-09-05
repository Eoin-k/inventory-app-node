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

getSingleItem = async (req, res) => {
	try {
		const id = req.params.id;
		const categories = await db.getAllCats();
		const manufacturers = await db.getManufacturers();
		const item = await db.getSingleItem({ id });
		console.log(item);
		res.render("singleItem", {
			manufacturers: manufacturers,
			categories: categories,
			item: item,
		});
	} catch (err) {
		console.error(err);
	}
};

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
	getSingleItem,
};
