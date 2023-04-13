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
const functions_1 = require("../../functions");
const router = (0, express_1.default)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const buyer = req.body.buyer;
        const total_price = req.body.totalPrice;
        const created_at = req.body.created_at;
        const paid = req.body.paid;
        if (!id || !buyer || isNaN(total_price) || !created_at || !isNaN(paid)) {
            res.status(400);
            throw new Error("Dados invalidos");
        }
        const [purchase] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (purchase) {
            res.status(400);
            throw new Error("insira um id diferente");
        }
        const isString = (0, functions_1.verifyStrings)(id, buyer, created_at);
        if (isString) {
            res.status(400);
            throw new Error("Os campos id, buyer e created_at devem ser strings");
        }
        const newPurchases = {
            id: id,
            buyer: buyer,
            total_price: total_price,
            created_at: created_at,
            paid: paid,
        };
        yield knex_1.db.insert(newPurchases).into("purchases");
        res.status(201).send(`Compra realizada com sucesso`);
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`
      SELECT * FROM purchases
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
exports.default = router;
//# sourceMappingURL=purchases.js.map