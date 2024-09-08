const db = require("../db/queries");

listAllItems = async (req, res) => {
	try {
		const categories = await db.getAllCats();
		const manufacturers = await db.getManufacturers();
		const items = await db.getAllItems();
		res.render("index", {
			categories: categories,
			items: items,
			manufacturers: manufacturers,
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	listAllItems,
};
