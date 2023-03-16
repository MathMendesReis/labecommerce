"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
});
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
app.get('/products', (req, res) => {
    res.status(200).send(database_1.products);
});
app.get('/product/search', (req, res) => {
    const q = req.query.name;
    const searchName = database_1.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(searchName);
});
app.post('/users', (req, res) => {
    const { id, name, email, password, createdAt } = req.body;
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt
    };
    database_1.users.push(newUser);
    res.status(201).send('Cadastro realizado com sucesso!');
});
app.post('/products', (req, res) => {
    const { id, name, price, description, imageUrl, category } = req.body;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
        category,
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post('/purchases', (req, res) => {
    const { userId, productId, quantity, totalPrice } = req.body;
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    database_1.purchase.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = database_1.products.find((product) => { return product.id === id; });
    product ?
        res.status(200).send(product)
        :
            res.status(200).send("objeto do produto não encontrado");
});
//# sourceMappingURL=index.js.map