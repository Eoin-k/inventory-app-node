const db = require("../db/queries");

getManufacturers = async (req, res) => {
	try {
		const manufacturers = await db.getManufacturers();
		res.render("addItem", { manufacturers: manufacturers });
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	getManufacturers,
};
