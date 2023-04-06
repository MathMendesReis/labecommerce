CREATE TABLE USERS (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PRODUCTS (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);


CREATE TABLE purchases(
  id TEXT NOT NULL UNIQUE,
  buyer TEXT NOT NULL , 
  total_price REAL NOT NULL , 
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  paid  INTEGER NOT NULL, 
  Foreign Key (buyer) REFERENCES users(id)
);


CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER,
    Foreign Key (purchase_id) REFERENCES purchases(id)
    Foreign Key (product_id) REFERENCES products(id)
)
