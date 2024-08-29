const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateNewItem = [
	body("manufacturer")
		.isLength({ min: 1 })
		.withMessage("name must be longer than 1 character"),
];

listManufacturerItems = async (req, res) => {
	const id = req.params.id;
	try {
		const items = await db.getManufacturerItems({ id });
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

renderNewManufacturerForm = async (req, res) => {
	res.render("addManufacturer");
};

addManufacturer = [
	validateNewItem,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render("addManufacturer", {
				errors: errors.array(),
			});
		}
		const { manufacturer } = req.body;
		await db.addManufacturer({ manufacturer });
		res.redirect("/");
	},
];
module.exports = {
	listManufacturerItems,
	renderNewManufacturerForm,
	addManufacturer,
};
