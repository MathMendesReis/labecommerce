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


//exercicio 002
export function createUser(id: string, name: string, email: string, password: string, createdAt: string): void {
    //funcao que cria usuario
    const newUser: TUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: createdAt
    }
    users.push(newUser)
    return console.log(`Cadastro realizado com sucesso`)
}


export function getAllUsers(array: TUser[]): void {
    //funcao que retorna todos os usuarios
    return console.table(array)
}


export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string, category: CATEGORYS): void {
    //funcao que cria produto
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl,
        category: category
    }
    products.push(newProduct)
    return console.log(`Produto cadastrado com sucesso`)
}


export function getAllProducts(array: TProduct[]): void {
    //funcao que retorna todos os produtos
    return console.log(array)
}

export function getAllProductsById(array: TProduct[], id: string): void {
    //funcao que pega produto por id
    const newArray = array.filter((p) => p.id === id)
    if (newArray.length > 0) {
        return console.table(newArray)
    } else {
        return console.log('produto nao cadastrado')
    }
}

//exercicio 003

export function queryProductsByName(array: TProduct[], name: string): void | string {
    // funcao que filtra produto por nome
    const arrayName = array.filter((n) => n.name === name)
    if (arrayName.length > 0) {
        return console.table(arrayName)
    } else {
        return console.log('produto não encontrado')

    }
}

export type TPurchase = {
    id: string,
    productId: string,
    quantity: number
    totalPrice: number
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number) {
    //funcao que guarda compra do usuario
    const newPurchase: TPurchase = {
        id: userId,
        productId: productId,
        quantity: quantity,
        // totalPrice: totalPrice
    }
    purchase.push(newPurchase)
    return console.log(newPurchase)
}

export function getAllPurchasesFromUserId(userId: string): void {
    const purchaseUserId = purchase.filter((id) => id.id === userId)
    return console.log(purchaseUserId)
}

