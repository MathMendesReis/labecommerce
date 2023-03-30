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

SELECT * from products ORDER BY price ASC LIMIT 20 ;