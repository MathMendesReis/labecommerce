import { products, users, purchase } from './database'

export type TUser = {
    // tipagem dos objetos
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
}

export type TProduct = {
    //tipagem dos produtos
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    category: CATEGORYS
}

export enum CATEGORYS {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupa",
    ELECTRONICS = "Eletrônicos"
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number,
    products: TProduct[]
}



