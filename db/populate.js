const { Client } = require("pg");
require("dotenv").config();

const SQL = `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, cat_name VARCHAR(255));

CREATE TABLE IF NOT EXISTS manufacturers (manufacturer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, manufacturer_name VARCHAR(255) NOT NULL, category_id INT REFERENCES categories(id));

CREATE TABLE IF NOT EXISTS items (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
item_name VARCHAR (255), 
item_quantity INT, 
item_image VARCHAR(255), 
manufacturer_id INT REFERENCES manufacturers(manufacturer_id), 
category_id INT REFERENCES categories(id)
);

INSERT INTO categories (cat_name) VALUES 
('Brake Pads'),
('Filters'),
('Suspension Parts');

INSERT INTO manufacturers (manufacturer_name,category_id) VALUES 
('BMW', 1);

INSERT INTO items (item_name,item_quantity,item_image,manufacturer_id,category_id) VALUES 
('Brake Pads',24,'../public/images/brakepads.jpg',1,1);
`;

async function main() {
	console.log("Starting database seeding");
	const client = new Client({
		connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.dbPort}/${process.env.database}`,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("Database has been seeded");
}

main();
