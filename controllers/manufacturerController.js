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
		const manufacturerName = await db.getManufacturerName({ id });
		res.render("manufacturerView", {
			categories: categories,
			items: items,
			manufacturers: manufacturers,
			manufacturerName: manufacturerName,
			manufacturerId: id,
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

deleteManufacturer = async (req, res) => {
	const id = req.params.id;

	const categories = await db.getAllCats();
	if (req.body.password === process.env.deletionpassword) {
		await db.deleteManufacturer({ id });
		const manufacturers = await db.getManufacturers();
		const items = await db.getAllItems();
		res.render("index", {
			categories: categories,
			manufacturers: manufacturers,
			items: items,
		});
	} else {
		const manufacturers = await db.getManufacturers();
		const items = await db.getAllItems();
		console.error("password does not match, cannot perform action");
		res.render("index", {
			errors: [{ msg: "incorrect password, could not delete manufacturer" }],
			categories: categories,
			manufacturers: manufacturers,
			items: items,
		});
	}
};

module.exports = {
	listManufacturerItems,
	renderNewManufacturerForm,
	addManufacturer,
	deleteManufacturer,
};
