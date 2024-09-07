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

async function getCatName({ id }) {
	const catName = await pool.query(
		"SELECT cat_name FROM categories WHERE id = $1",
		[id],
	);
	return catName.rows[0].cat_name;
}

async function getManufacturerItems({ id }) {
	const items = await pool.query(
		"SELECT * FROM items WHERE manufacturer_id = $1",
		[id],
	);
	return items.rows;
}

async function getManufacturerName({ id }) {
	const manufacturerName = await pool.query(
		"SELECT manufacturer_name FROM manufacturers WHERE manufacturer_id = $1",
		[id],
	);
	return manufacturerName.rows[0].manufacturer_name;
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

async function updateItemInDb({
	itemname,
	itemqty,
	itemimage,
	itemdescription,
	manufacturer,
	category,
	id,
}) {
	pool.query(
		"UPDATE items SET item_name = $1, item_quantity = $2, item_image = $3, manufacturer_id = $4, category_id = $5, item_description = $6 WHERE id = $7",
		[itemname, itemqty, itemimage, manufacturer, category, itemdescription, id],
	);
	pool.query(
		"UPDATE items SET manufacturer_name = manufacturers.manufacturer_name FROM manufacturers WHERE items.manufacturer_id = manufacturers.manufacturer_id",
	);
}

async function addManufacturer({ manufacturer }) {
	await pool.query(
		"INSERT INTO manufacturers (manufacturer_name) VALUES ($1)",
		[manufacturer],
	);
	console.log("Manufacturer Added Successfully");
}

async function addCategory({ category }) {
	await pool.query("INSERT INTO categories (cat_name) VALUES ($1)", [category]);
	console.log("Category added successfully");
}

async function deleteCategory({ id }) {
	await pool.query("DELETE FROM categories WHERE id = $1", [id]);
	console.log("Category successfully deleted");
}

async function deleteItem({ id }) {
	await pool.query("DELETE FROM items WHERE id = $1", [id]);
	console.log("item Deleted");
}

async function deleteManufacturer({ id }) {
	await pool.query("DELETE FROM items WHERE manufacturer_id = $1", [id]);
	await pool.query("DELETE FROM manufacturers WHERE manufacturer_id = $1", [
		id,
	]);
	console.log("Manufacturer & Related Items Deleted");
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
	updateItemInDb,
	addCategory,
	deleteCategory,
	getCatName,
	deleteItem,
	getManufacturerName,
	deleteManufacturer,
};
