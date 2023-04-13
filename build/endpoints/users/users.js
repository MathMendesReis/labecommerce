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
        res.status(200).send(yield (0, knex_1.db)("users"));
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
        if (!id || !email || !password) {
            res.status(400);
            throw new Error("Dados inválidos");
        }
        const isUserInDB = yield (0, knex_1.db)("users").where({ id: id });
        if (isUserInDB.length > 0) {
            res.status(400);
            throw new Error("Usuario ja esta cadastrado.");
        }
        const isEmailInDB = yield (0, knex_1.db)("users").where({ email: email });
        if (isEmailInDB.length > 0) {
            res.status(400);
            throw new Error("Email ja esta cadastrado.");
        }
        if (password.length < 6) {
            res.status(400);
            throw new Error("A senha precisa ter no minimo 6 caracteres.");
        }
        const newUser = {
            id: id,
            email: email,
            password: password,
        };
        yield (0, knex_1.db)("users").insert(newUser);
        res.status(201).send({ message: "Cadastro realizado com sucesso!" });
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
        const result = yield (0, knex_1.db)("users").where({ id: id });
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
        const [user] = yield (0, knex_1.db)("users").where({ id: id });
        if (user) {
            yield (0, knex_1.db)("users").del().where({ id: id });
        }
        else {
            res.status(404);
            throw new Error(`Usuario não encontrado.`);
        }
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
        const [user] = yield (0, knex_1.db)("users").where({ id: id });
        if (user) {
            const updatedUser = {
                email: newEmail !== undefined ? newEmail : user.email,
                password: newPassword !== undefined ? newPassword : user.password,
            };
            yield (0, knex_1.db)("users").where({ id: id }).update(updatedUser);
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