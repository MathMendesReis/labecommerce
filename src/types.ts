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
    category: string
}

export enum CATEGORYS {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupa",
    ELECTRONICS = "Eletrônicos"
}

export type TPurchase = {
    id: string,
    productId: string,
    quantity: number
    totalPrice: number
}



