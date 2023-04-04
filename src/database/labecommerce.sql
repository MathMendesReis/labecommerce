-- Active: 1679996012157@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
INSERT INTO users(id, email, password) 
VALUES("u001","ciclano@gmail.com","ciclano123"),
("u002","fulana@gmail.com","fulana123"),
("u003","alice@gmail.com","alice123");


-- id (TEXT, PK, único e obrigatório)
-- name (TEXT e obrigatório)
-- price (REAL e obrigatório)
-- category (TEXT e obrigatório)

CREATE TABLE products(
    id text primary key unique not null,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


insert into products (id, name, price,category) 
values
("prod001","Teclado gamer",200,"Eletronicos"),
("prod002","Mouse",103,"Eletronicos"),
("prod003","Monitor",299,"Eletronicos"),
("prod004","Sandalha",15,"Eletronicos"),
("prod005","Calça Jeans",350,"Eletronicos");

SELECT * from products;
SELECT * from users;

-- Get All Users
SELECT * from users;

-- Get All Products

select * from products;

-- Search Product by name
SELECT * from products where name = "mouse";

-- Create User
INSERT INTO users(id, email, password)
values("u004","regiane@gmail.com","regiane123");

-- Create Product

insert into products(id,name,price,category)
values(
    "prod006","Bermuda saruel",199,"Roupa"
);

-- Get product by ID
SELECT * from products WHERE id = "prod006";

-- Delete user by id
delete from products WHERE id = "prod006";

-- Edit user by id
UPDATE users set email = "mariana@gmail.com" WHERE id = "u004";

-- Edit Product by id
UPDATE products SET name = "calça saruel" WHERE id ="prod066";

-- get all user ordenado pelo email

SELECT * from users ORDER BY email;

-- Get All Products versão 1

-- SELECT * from products ORDER BY price ASC LIMIT 20 ;

-- Get All Products versão 2

-- SELECT * from products WHERE price > 100.00  and price < 300.00;


create table purchases(
    id text PRIMARY key UNIQUE NOT NULL,
    total_price real not null,
    paid integer not NULL,
    delivered_at TEXT,
    buyer_id TEXT not null ,
    FOREIGN key (buyer_id) REFERENCES users(id)
);

insert into purchases(id, total_price, paid, delivered_at, buyer_id)
VALUES
("PUR-001",200,1,datetime('now'),"u001"),
("PUR-002",300,1,datetime('now'),"u002"),
("PUR-003",100,0,datetime('now'),"u003"),
("PUR-004",400,0,datetime('now'),"u004");

SELECT * from purchases 
INNER JOIN users
on users.id = purchases.buyer_id;