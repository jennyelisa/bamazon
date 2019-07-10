DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(400) NULL,
    department_name VARCHAR(400) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat food", "Pet", 19, 15),
		("Dog food", "Pet", 15, 15),
        ("Sunglasses", "Self", 25, 10),
        ("AirPods", "Entertainment", 200, 10),
        ("GoT BluRay S2", "Entertainment", 45, 15),
        ("iPod Classic", "Entertainment", 100, 20),
        ("Shampoo", "Self", 8, 30),
        ("Conditoner", "Self", 8, 30),
        ("Dog Leash", "Pet", 10, 20),
        ("Cat Nip", "Pet", 2, 50);
        
