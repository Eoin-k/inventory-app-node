const pool = require("./pool.js");

async function getAllItems() {
	const items = await pool.query(`SELECT * FROM items;`);
	return items.rows;
}

async function getSingleItem({ id }) {
	const item = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
	return item.rows[0];
}

async function getAllCats() {
	const categories = await pool.query(`SELECT * FROM categories;`);
	return categories.rows;
}

async function getManufacturers() {
	const manufacturers = await pool.query(`SELECT * FROM manufacturers;`);
	return manufacturers.rows;
}

async function getCatItems({ id }) {
	const items = await pool.query("SELECT * FROM items WHERE category_id = $1", [
		id,
	]);
	return items.rows;
}

async function getManufacturerItems({ id }) {
	const items = await pool.query(
		"SELECT * FROM items WHERE manufacturer_id = $1",
		[id],
	);
	return items.rows;
}
async function addItemToDb({
	itemname,
	itemqty,
	itemimage,
	itemdescription,
	manufacturer,
	category,
}) {
	await pool.query(
		"INSERT INTO items(item_name,item_quantity,item_image,manufacturer_id, category_id,item_description) VALUES ($1,$2,$3,$4,$5,$6)",
		[itemname, itemqty, itemimage, manufacturer, category, itemdescription],
	);

	await pool.query(
		"UPDATE items SET manufacturer_name = manufacturers.manufacturer_name FROM manufacturers WHERE items.manufacturer_id = manufacturers.manufacturer_id",
	);
	console.log("item successfully added");
}

async function addManufacturer({ manufacturer }) {
	await pool.query(
		"INSERT INTO manufacturers (manufacturer_name) VALUES ($1)",
		[manufacturer],
	);
	console.log("Manufacturer Added Successfully");
}

module.exports = {
	getAllItems,
	getAllCats,
	getManufacturers,
	addItemToDb,
	getCatItems,
	getManufacturerItems,
	addManufacturer,
	getSingleItem,
};
