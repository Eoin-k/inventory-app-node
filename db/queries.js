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

module.exports = {
	getAllItems,
	getAllCats,
	getManufacturers,
};
