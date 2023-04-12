"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
//# sourceMappingURL=getAllProducts.js.map