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
        const result = yield knex_1.db.raw(`
            SELECT * FROM products
        `);
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
    const result = yield knex_1.db.raw(`
        SELECT * FROM products
        WHERE LOWER(name) = LOWER('${search}')
    `);
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
        yield knex_1.db.raw(`
        INSERT INTO products
        (id,name,price,description,image_url)
        VALUES
        ('${id}','${name}',${price})
        `);
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
router.get("/name/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield knex_1.db.raw(`
        SELECT * FROM products
        WHERE id = '${id}'
      `);
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
        yield knex_1.db.raw(`
    DELETE FROM products
    WHERE id = '${id}'
    `);
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
exports.default = router;
//# sourceMappingURL=products.js.map