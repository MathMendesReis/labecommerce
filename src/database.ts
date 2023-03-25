import { TUser, TProduct, CATEGORYS, TPurchase } from "./types"

export const users: TUser[] = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "2023-01-15 09:12:42",
    }
]

export const products: TProduct[] = [
    {
        id: "prod003",
        name: "Teclado gamer",
        price: 200,
        description: "Teclado mecânico com numpad",
        imageUrl: "https://picsum.photos/seed/Teclado%20gamer/400",
        category: CATEGORYS.ELECTRONICS
    }
]

export const purchase: TPurchase[] = [
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
                category: CATEGORYS.ELECTRONICS
            }
        ]
    }
]

