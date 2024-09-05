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
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const categories = await db.getAllCats();
			const manufacturers = await db.getManufacturers();
			return res.status(200).render("additem", {
				errors: errors.array(),
				manufacturers: manufacturers,
				categories: categories,
			});
		}
		const {
			itemname,
			itemqty,
			itemimage,
			manufacturer,
			category,
			itemdescription,
		} = req.body;

		await db.addItemToDb({
			itemname,
			itemqty,
			itemimage,
			manufacturer,
			category,
			itemdescription,
		});
		res.redirect("/");
	},
];

updateItem = [
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const id = req.params.id;
			const categories = await db.getAllCats();
			const manufacturers = await db.getManufacturers();
			const item = await db.getSingleItem({ id });
			return res.status(200).render("singleItem", {
				errors: errors.array(),
				manufacturers: manufacturers,
				categories: categories,
				item: item,
			});
		}
		const {
			itemname,
			itemqty,
			itemimage,
			manufacturer,
			category,
			itemdescription,
			id,
		} = req.body;

		await db.updateItemInDb({
			itemname,
			itemqty,
			itemimage,
			manufacturer,
			category,
			itemdescription,
			id,
		});
		res.redirect("/");
	},
];

module.exports = {
	getItemAttributes,
	addItem,
	getSingleItem,
	updateItem,
};
