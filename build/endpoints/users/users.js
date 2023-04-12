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
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`
            SELECT * FROM users
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
            res.send(`Erro inesperado.`);
        }
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        yield knex_1.db.raw(`
        INSERT INTO users
        (id,email,password)
        VALUES
        ('${id}','${email}','${password}')
        `);
        res.status(201).send(`Cadastro realizado com sucesso.`);
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
router.get("/:id/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield knex_1.db.raw(`
      SELECT * FROM purchases
      WHERE buyer = '${id}'
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
            res.send(`Erro inesperado`);
        }
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield knex_1.db.raw(`
    DELETE FROM users
    WHERE id = '${id}'
    `);
        res.status(201).send("User apagado com sucesso");
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
        const newEmail = req.body.newEmail || undefined;
        const newPassword = req.body.newPassword || undefined;
        console.log(id);
        console.log(newEmail);
        console.log(newPassword);
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400);
                throw new Error("'newEmail' deve ser string");
            }
            if (!newEmail.includes("@")) {
                res.status(400);
                throw new Error("'newEmail' deve conter o caractere @");
            }
        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400);
                throw new Error("'newPassword' deve ser string");
            }
        }
        const [user] = yield knex_1.db.raw(`
   SELECT * FROM users
   WHERE id = '${id}'
`);
        if (user) {
            yield knex_1.db.raw(`
      UPDATE users
      SET
      email = '${newEmail || user.email}',
      password = '${newPassword || user.password}'
      WHERE id = '${id}'
   `);
        }
        else {
            res.status(404);
            throw new Error("id' não encontrada");
        }
        res.status(201).send("Cadastro atualizado com sucesso");
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
//# sourceMappingURL=users.js.map