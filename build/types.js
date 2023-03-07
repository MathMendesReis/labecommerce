"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getAllProductsById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.CATEGORYS = void 0;
const database_1 = require("./database");
var CATEGORYS;
(function (CATEGORYS) {
    CATEGORYS["ACCESSORIES"] = "Acess\u00F3rios";
    CATEGORYS["CLOTHES_AND_SHOES"] = "Roupa";
    CATEGORYS["ELECTRONICS"] = "Eletr\u00F4nicos";
})(CATEGORYS = exports.CATEGORYS || (exports.CATEGORYS = {}));
function createUser(id, name, email, password, createdAt) {
    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: createdAt
    };
    database_1.users.push(newUser);
    return console.log(`Cadastro realizado com sucesso`);
}
exports.createUser = createUser;
function getAllUsers(array) {
    return console.table(array);
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl, category) {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl,
        category: category
    };
    database_1.products.push(newProduct);
    return console.log(`Produto cadastrado com sucesso`);
}
exports.createProduct = createProduct;
function getAllProducts(array) {
    return console.log(array);
}
exports.getAllProducts = getAllProducts;
function getAllProductsById(array, id) {
    const newArray = array.filter((p) => p.id === id);
    if (newArray.length > 0) {
        return console.table(newArray);
    }
    else {
        return console.log('produto nao cadastrado');
    }
}
exports.getAllProductsById = getAllProductsById;
function queryProductsByName(array, name) {
    const arrayName = array.filter((n) => n.name === name);
    if (arrayName.length > 0) {
        return console.table(arrayName);
    }
    else {
        return console.log('produto não encontrado');
    }
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        id: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    };
    database_1.purchase.push(newPurchase);
    return console.log(newPurchase);
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userId) {
    const purchaseUserId = database_1.purchase.filter((id) => id.id === userId);
    return console.log(purchaseUserId);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=types.js.map