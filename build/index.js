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
app.get('/products/:name', (req, res) => {
    try {
        const name = req.params.name;
        const productById = database_1.products.find((product) => product.name.toLocaleLowerCase() === name.toLocaleLowerCase());
        if (name === undefined) {
            throw new Error('Necessario inserir NOME do Usuario.');
            res.status(401);
        }
        if (!productById) {
            throw new Error('Produto não foi encontrado');
            res.status(404);
        }
        res.status(200).send(productById);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
app.get('/users/:name', (req, res) => {
    try {
        const name = req.params.name;
        if (name === undefined) {
            throw new Error('Necessario inserir ID do Usuario.');
        }
        const userByName = database_1.users.find((user) => user.name === name);
        if (!userByName) {
            throw new Error('Usuario não foi encontrado');
            res.status(404);
        }
        res.status(200).send(userByName);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
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
            res.status(201).send("Compra realizada com sucesso");
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
            res.status(201).send('Compra realizada com sucesso');
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
app.delete('/users/:id', (req, res) => {
    try {
        const id = req.params.id;
        const index = database_1.users.findIndex((user) => user.id === id);
        if (index >= 0) {
            database_1.users.splice(index, 1);
        }
        res.status(200).send('Usuario removido');
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
app.delete('/products/:id', (req, res) => {
    try {
        const id = req.params.id;
        const index = database_1.products.findIndex((p) => p.id === id);
        if (index >= 0) {
            database_1.products.splice(index, 1);
        }
        res.status(200).send('Produto removido com sucesso');
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
app.put("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error("Nome deve ser uma string");
                res.status(401);
            }
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("email deve ser uma string");
                res.status(401);
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("Email deve ser uma string");
                res.status(401);
            }
        }
        const user = database_1.users.find((user) => user.id === id);
        if (user) {
            user.id = id || user.id;
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;
        }
        res.status(200).send('Usuario teva os dados atualizados');
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
        res.send(error.message);
    }
});
app.put('/products/:id', (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const isProduct = database_1.products.find((product) => product.id === id);
        if (isProduct) {
            isProduct.id = id || isProduct.id;
            isProduct.name = name || isProduct.name;
            isProduct.price = price || isProduct.price;
            isProduct.category = category || isProduct.category;
        }
        res.status(200).send('Usuario teva os dados atualizados');
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.statusCode = 500;
        }
    }
});
//# sourceMappingURL=index.js.map