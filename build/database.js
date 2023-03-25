"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "2023-01-15 09:12:42",
    }
];
exports.products = [
    {
        id: "prod003",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400",
        category: types_1.CATEGORYS.ELECTRONICS
    }
];
exports.purchase = [
    {
        userId: 'u001',
        productId: 'prod003',
        quantity: 1,
        totalPrice: 200,
        products: [
            {
                id: 'prod003',
                name: 'Teclado gamer',
                price: 200,
                description: 'Teclado mecânico com numpad',
                imageUrl: 'https://picsum.photos/seed/Teclado%20gamer/400',
                category: types_1.CATEGORYS.ELECTRONICS
            }
        ]
    }
];
//# sourceMappingURL=database.js.map