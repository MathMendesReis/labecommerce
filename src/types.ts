import { products, users } from './database'

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


export function createUser(id: string, name: string, email: string, password: string, createdAt: string): void {
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
    return console.table(array)
}


export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string, category: CATEGORYS): void {
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
    return console.log(array)
}

export function getAllProductsById(array: TProduct[], id: string): void {
    const newArray = array.filter((p) => p.id === id)
    if (newArray.length > 0) {
        return console.table(newArray)
    } else {
        return console.log('produto nao cadastrado')
    }
}

export function queryProductsByName(array: TProduct[], name: string): void | string {
    const arrayName = array.filter((n) => n.name === name)
    if (arrayName.length > 0) {
        return console.table(arrayName)
    } else {
        return console.log('produto não encontrado')

    }
}