const db = require("../db/queries");

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

module.exports = {
	listAllCatItems,
};
