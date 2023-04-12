"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./endpoints/users/users"));
const products_1 = __importDefault(require("./endpoints/products/products"));
const purchases_1 = __importDefault(require("./endpoints/purchases/purchases"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
});
app.use('/users', users_1.default);
app.use('/products', products_1.default);
app.use('/purchases', purchases_1.default);
//# sourceMappingURL=index.js.map