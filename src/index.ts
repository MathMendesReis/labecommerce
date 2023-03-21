import { users, products, purchase } from "./database";

import express, { Response, Request } from "express";
import cors from 'cors'
import { CATEGORYS, TProduct, TPurchase, TUser } from "./types";

const app = express()


app.use(express.json())

app.use(cors())


app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})




app.get('/users', (req: Request, res: Response) => {
    // Get All Users
    try {
        res.status(200).send(users)

    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

app.get('/products', (req: Request, res: Response) => {
    // Get All Products
    try {
        res.status(200).send(products)

    } catch (error: any) {
        res.status(500).send(error.message)
    }
})


app.get('/product/search', (req: Request, res: Response) => {
    // Search Product by name
    const q = req.query.name as string
    const searchName = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(searchName)
})


app.post('/users', (req: Request, res: Response) => {
    // Create User

    const { id, name, email, password, createdAt } = req.body
    const newUser: TUser = {
        id,
        name,
        email,
        password,
        createdAt
    }

    users.push(newUser)

    res.status(201).send('Cadastro realizado com sucesso!')


})

app.post('/products', (req: Request, res: Response) => {
    // Create Product

    const { id, name, price, description, imageUrl, category } = req.body
    const newProduct: TProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
        category,
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})



app.post('/purchases', (req: Request, res: Response) => {
    // Create Purchase

    const { userId, productId, quantity, totalPrice } = req.body
    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})



app.get('/products/:id', (req: Request, res: Response) => {
    //Get Products by id

    const id = req.params.id as string
    const product = products.find((product) => { return product.id === id })

    product ?
        res.status(200).send(product)
        :
        res.status(200).send("objeto do produto não encontrado")

})


app.get('/users/:id/purchases', (req: Request, res: Response) => {
    //Get user Purchases by User id


    res.status(200).send()
})

// exercicio 002


// Delete User by id,

app.delete('/users/:id', (req: Request, res: Response) => {

    const id = req.params.id
    const index = users.findIndex((user) => user.id === id)
    index === -1 ?
        (res.status(404).send('usuario nao encontrado'))
        :
        (users.splice(index, 1), res.status(200).send("User apagado com sucesso"
        ))
})

// Delete Product by id

app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const index = products.findIndex((product) => product.id === id)
    index === -1 ?
        (res.status(404).send('Produto nao encontrado'))
        :
        (users.splice(index, 1), res.status(200).send("Produto apagado com sucesso"
        ))

})

// exercicio 003

// Edit User by id
app.put('/users/:id', (req: Request, res: Response) => {

    const id = req.params.id


    const newName = req.body.name as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

    user ? (
        user.id = user.id,
        user.name = newName || user.name,
        user.email = newEmail || user.email,
        user.password = newPassword || user.password,
        user.createdAt = user.createdAt,
        res.status(200).send("Atualização realizada com sucesso")
    )
        :
        (res.status(200).send("Usuario não encontrado"))

})

// Edit Product by id
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.number as number | undefined
    const newDescripition = req.body.description as string | undefined
    const newCategory = req.body.category as CATEGORYS | undefined

    const product = products.find((product) => product.id === id)


    product ? (
        product.name = newName || product.name,
        product.price = newPrice || product.price,
        product.description = newDescripition || product.description,
        product.category = newCategory || product.category,
        res.status(200).send("Atualização realizada com sucesso")
    )
        :
        (res.status(200).send("Usuario não encontrado"))

})

