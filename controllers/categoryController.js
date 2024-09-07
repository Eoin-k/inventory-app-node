const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const validateNewItem = [
	body("category")
		.isLength({ min: 1 })
		.withMessage("name must be longer than 1 character"),
];

listAllCatItems = async (req, res) => {
	const id = req.params.id;
	try {
		const items = await db.getCatItems({ id });
		const categories = await db.getAllCats();
		const manufacturers = await db.getManufacturers();
		const catName = await db.getCatName({ id });
		res.render("categoryItems", {
			categories: categories,
			items: items,
			manufacturers: manufacturers,
			catName: catName,
			catId: id,
		});
	} catch (err) {
		console.error(err);
	}
};

renderNewCategoryform = async (req, res) => {
	res.render("addCategory");
};

addCategory = [
	validateNewItem,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render("addCategory", {
				errors: errors.array(),
			});
		}
		const { category } = req.body;
		await db.addCategory({ category });
		res.redirect("/");
	},
];

deleteCategory = async (req, res) => {
	const id = req.params.id;
	const items = await db.getAllItems();
	const categories = await db.getAllCats();
	const manufacturers = await db.getManufacturers();
	if (req.body.password === process.env.deletionpassword) {
		await db.deleteCategory({ id });
		res.render("index", {
			categories: categories,
			manufacturers: manufacturers,
			items: items,
		});
	} else {
		console.error("password does not match, cannot perform action");
		res.render("index", {
			errors: [{ msg: "incorrect password, could not delete category" }],
			categories: categories,
			manufacturers: manufacturers,
			items: items,
		});
	}
};

module.exports = {
	listAllCatItems,
	renderNewCategoryform,
	addCategory,
	deleteCategory,
};
