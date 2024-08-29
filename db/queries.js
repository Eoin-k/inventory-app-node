const pool = require("./pool.js");

async function getAllItems() {
	const items = await pool.query(`SELECT * FROM items;`);
	return items.rows;
}

async function getAllCats() {
	const categories = await pool.query(`SELECT * FROM categories;`);
	return categories.rows;
}

async function getManufacturers() {
	const manufacturers = await pool.query(`SELECT * FROM manufacturers;`);
	return manufacturers.rows;
}

async function addItemToDb({
	itemname,
	itemqty,
	itemimage,
	manufacturer,
	category,
}) {
	await pool.query(
		"INSERT INTO items(item_name,item_quantity,item_image,manufacturer_id, category_id) VALUES ($1,$2,$3,$4,$5)",
		[itemname, itemqty, itemimage, manufacturer, category],
	);
	console.log("item successfully added");
}

module.exports = {
	getAllItems,
	getAllCats,
	getManufacturers,
	addItemToDb,
};
