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
app.get("/users", (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
app.get('', (req, res) => {
});
app.get("/product/search", (req, res) => {
    try {
        const name = req.query.name;
        if (name === undefined) {
            res.status(422);
            throw new Error("query params deve possuir pelo menos um caractere");
        }
        const result = database_1.products.filter((product) => product.name.toLowerCase() === name.toLowerCase());
        if (result.length > 0) {
            res.status(200).send(result);
        }
        else {
            res.status(200).send("Produto não cadastrado");
        }
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
app.post('/users', (req, res) => {
    try {
        const DATE = new Date();
        let id = `u${Math.floor(Math.random() * 100)}`;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const createdAt = `${DATE}`;
        if (!id || !name || !email || !password) {
            throw new Error('Necessario preencher todos os campos obrigatorios.');
        }
        if (database_1.users.some((user) => user.id === id)) {
            while (database_1.users.find((user) => user.id === id)) {
                id = `u${Math.floor(Math.random() * 100)}`;
            }
        }
        const newUser = {
            id,
            name,
            email,
            password,
            createdAt
        };
        database_1.users.push(newUser);
        res.status(201).send('cadastro realizado com sucesso');
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
app.post('/products', (req, res) => {
    try {
        let id = `${Math.floor(Math.random() * 100)}`;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        const category = req.body.category;
        if (!name || !price || !description || !imageUrl || !category) {
            throw new Error("Necessario preencher todos os campos obrigatorios");
        }
        if (database_1.products.some((user) => user.id === id)) {
            throw new Error('Produto ja existe na base de dados');
        }
        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl,
            category
        };
        database_1.products.push(newProduct);
        res.status(201).send("produto criado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
app.post('/purchases', (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        if (!userId || !productId) {
            throw new Error('Necessario preencher todos os campos obrigatorios');
        }
        const isUser = database_1.users.some((user) => { user.id === userId; });
        if (isUser) {
            throw new Error("Usuario não esta cadastrado");
        }
        const prod = database_1.products.find((p) => p.id === productId);
        if (!prod) {
            throw new Error("Produto não esta cadastrado");
        }
        const isPurchase = database_1.purchase.find((p) => p.userId === userId);
        if (isPurchase !== undefined) {
            isPurchase.quantity += 1;
            isPurchase.totalPrice += prod.price;
            if (isPurchase.products.some((p) => p.id !== prod.id)) {
                isPurchase.products = [...isPurchase.products, prod];
            }
            res.status(201).send("entrei no if");
        }
        else {
            const newPurchase = {
                userId,
                productId,
                quantity: 1,
                totalPrice: prod.price,
                products: []
            };
            newPurchase.products.push(prod);
            database_1.purchase.push(newPurchase);
            res.status(201).send('entrei no else');
        }
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 200;
        }
        res.send(error.message);
    }
});
app.get('/purchase', (req, res) => {
    try {
        res.status(200).send(database_1.purchase);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
//# sourceMappingURL=index.js.map