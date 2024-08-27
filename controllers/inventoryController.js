const db = require("../db/queries");

listAllItems = async (req, res) => {
	try {
		const categories = await db.getAllCats();
		const items = await db.getAllItems();
		res.render("index", { categories: categories, items: items });
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	listAllItems,
};
