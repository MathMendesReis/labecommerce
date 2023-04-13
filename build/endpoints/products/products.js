"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knex_1 = require("../../database/knex");
const router = (0, express_1.default)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("products");
        res.status(200).send(result);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send(`Erro inesperado`);
        }
    }
}));
router.get("/:search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.params.search;
    const result = yield (0, knex_1.db)("products").where({ name: search });
    res.status(200).send(result);
    try {
    }
    catch (error) { }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        if (!id || !name || !price) {
            res.status(400);
            throw new Error("Dados inválidos");
        }
        const isProductInDB = yield (0, knex_1.db)("products").where({ id: id });
        if (isProductInDB.length > 0) {
            res.status(400);
            throw new Error("Produto ja cadastrado");
        }
        if (typeof price !== "number") {
            res.status(400);
            throw new Error("Dados inválidos");
        }
        if (name.length < 3) {
            res.status(400);
            throw new Error("Nome precisa ter pelo menos 3 caracteres");
        }
        const newProduct = {
            id: id,
            name: name,
            price: price,
        };
        yield (0, knex_1.db)("products").insert(newProduct);
        res.status(201).send(`Produto cadastrado com sucesso.`);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send(`Error inesperado`);
        }
    }
}));
router.get("/search/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, knex_1.db)("products").where({ id: id });
        res.status(201).send(result);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send(`Error inesperado`);
        }
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [product] = yield (0, knex_1.db)("products").where({ id: id });
        if (product) {
            yield (0, knex_1.db)("products").del().where({ id: id });
        }
        else {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        res.status(201).send("Produto apagado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send(`Erro inesperado`);
        }
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const name = req.body.name || undefined;
        const price = req.body.price || undefined;
        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error("name precisa ser do tipo string");
            }
        }
        if (price !== undefined) {
            if (typeof price !== "number") {
                throw new Error("price precisa ser do tipo number");
            }
        }
        const [product] = yield (0, knex_1.db)("products").where({ id: id });
        if (product) {
            const updateProduct = {
                name: name !== undefined ? name : product.name,
                price: price !== undefined ? price : product.price,
            };
            yield (0, knex_1.db)("products").where({ id: id }).update(updateProduct);
        }
        else {
            throw new Error("id não encontrada.");
        }
        res.status(201).send("Produto alterado com sucesso.");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
exports.default = router;
//# sourceMappingURL=products.js.map