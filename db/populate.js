const { Client } = require("pg");
require("dotenv").config();

const SQL = `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, cat_name VARCHAR(255));

CREATE TABLE IF NOT EXISTS manufacturers (manufacturer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, manufacturer_name VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS items (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
item_name VARCHAR (255), 
item_quantity INT,
item_description VARCHAR (255), 
item_image VARCHAR(255), 
manufacturer_id INT REFERENCES manufacturers(manufacturer_id), 
category_id INT REFERENCES categories(id),
manufacturer_name VARCHAR (255)
);

INSERT INTO categories (cat_name) VALUES 
('Brake Pads'),
('Engines'),
('Suspension Parts'),
('Oils');

INSERT INTO manufacturers (manufacturer_name) VALUES 
('BMW'),
('Land Rover'),
('Bugatti'),
('Toyota');

INSERT INTO items (item_name,item_quantity,item_image,manufacturer_id,category_id,manufacturer_name,item_description) VALUES 
('Brake Pads',24,'https://cdn.autodoc.de/thumb?id=17789932&m=1&n=0&lng=en&rev=94077839',1,1,'BMW','These are really great break pads, long wearing, good stopping power and cheap'),('Brake Pads',4,'https://cdn.autodoc.de/thumb?id=17789932&m=1&n=0&lng=en&rev=94077839',4,1,'Toyota','These are really great break pads, long wearing, good stopping power and cheap'),

('2.0 Litre Engine',2,'https://scdn.autodoc.de/catalog/categories/150x150/10102.png ',1,2,'BMW','Strong Reliable 2.0 Litre Diesel engine'),

('8.0 Litre W16 Engine',1,'https://scdn.autodoc.de/catalog/categories/150x150/10102.png ',3,2,'Bugatti','Insanely powerful 8.0 Litre 1000+ horsepower engine'),

('Full front suspension kit',1,'https://www.moogparts.com/content/loc-emea/loc-eu/fmmp-moog/en_GB/products/_jcr_content/main-par/header_foreground/foreground-image.img.png/products-range1-1559292557886.png',1,3,'BMW','Full fron replacement suspension kit for BMW models'),

('2.0 Litre Engine',2,'https://scdn.autodoc.de/catalog/categories/150x150/10102.png ',2,2,'Land Rover','Strong Reliable 2.0 Litre Diesel engine');
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
