exports.listAllItems = (req, res) => {
	res.render("index", { categories: categories, items: items });
};
