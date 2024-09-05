const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

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
		res.render("index", {
			categories: categories,
			items: items,
			manufacturers: manufacturers,
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

module.exports = {
	listAllCatItems,
	renderNewCategoryform,
	addCategory,
};
