"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const database_1 = require("./database");
(0, types_1.createUser)("u003", "beltrano@email.com", "beltrano99", '123456', '');
(0, types_1.getAllUsers)(database_1.users);
(0, types_1.createProduct)('002', 'smartphone', 2999, 'Smartphone samsung galaxy 2', 'img', types_1.CATEGORYS.ELECTRONICS);
(0, types_1.getAllProducts)(database_1.products);
(0, types_1.getAllProductsById)(database_1.products, 'prod003');
(0, types_1.queryProductsByName)(database_1.products, '');
(0, types_1.createPurchase)(database_1.users[0].id, database_1.products[0].id, 5, 2999);
(0, types_1.getAllPurchasesFromUserId)(database_1.users[0].id);
//# sourceMappingURL=index.js.map