create database bamazon;

CREATE table products (
item_id  INT auto_increment primary key,
product_name varchar(30),
department_name varchar(20),
price decimal (9,2),
stock_quantity integer(10));

use bamazon;

drop table bamazon.products;

update products set stock_quantity = 20 where item_id=4;

insert into products values("1","Coke","Food and Beverages", "1.0", "30");


insert into products (product_name,department_name,price,stock_quantity) values("Lindt","Choclates", 9.99, 30);

select * from products