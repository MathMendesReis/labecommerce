-- Active: 1681775389241@@127.0.0.1@3306
CREATE TABLE USERS (
-- nome da tabela: users
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- email (TEXT, único e obrigatório)
-- password (TEXT e obrigatório)
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

ALTER TABLE users DROP created_at;

CREATE TABLE PRODUCTS (
-- nome da tabela: products
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- name (TEXT e obrigatório)
-- price (REAL e obrigatório)
-- category (TEXT e obrigatório)
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL
);

ALTER TABLE PRODUCTS DROP image_url;



CREATE TABLE purchases(
-- nome da tabela: purchases
-- colunas da tabela:
-- id (TEXT, PK, único e obrigatório)
-- total_price (REAL e obrigatório)
-- paid (INTEGER e obrigatório)
-- created_at (TEXT e opcional)
-- buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)
  id TEXT NOT NULL UNIQUE,
  total_price REAL NOT NULL , 
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  paid  INTEGER NOT NULL, 
  buyer TEXT NOT NULL , 
  Foreign Key (buyer) REFERENCES users(id)
);


SELECT * from purchases;
ALTER TABLE purchases DROP image_url;



CREATE TABLE purchases_products(
-- nome da tabela: purchases_products
-- colunas da tabela:
-- purchase_id (TEXT e obrigatório, não deve ser único)
-- product_id (TEXT e obrigatório, não deve ser único)
-- quantity (INTEGER e obrigatório, não deve ser único)
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER,
    Foreign Key (purchase_id) REFERENCES purchases(id)
    Foreign Key (product_id) REFERENCES products(id)
);

SELECT * FROM products
        WHERE id = '67';


SELECT * from purchases_products;
DELETE FROM purchases;
