import { users, products, purchase } from "./database";

//importando o express 👇🏽
import express, { Response, Request } from "express";
import cors from 'cors'
import { TProduct, TPurchase, TUser } from "./types";

//Criacao do servidor 👇🏽
const app = express()

// configuracao que garante que nossas respostas estejam sempre no formato json

app.use(express.json())

app.use(cors())


app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})

app.get('/ping', (req: Request, res: Response) => {
    //endpoint teste
    res.send('pong')
})


app.get('/users', (req: Request, res: Response) => {

    // Get All Users
    // method HTTP(GET)
    // path("/users")
    // response
    // status 200
    // array de users do database.ts

    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {

    //Get All Products
    // method HTTP(GET)
    //path("/products")
    //response
    // status 200
    // array de products do database.ts

    res.status(200).send(products)
})


app.get('/product/search', (req: Request, res: Response) => {
    // method HTTP(GET)
    // path("/product/search")
    // query params
    // q
    // response
    // status 200
    // array do resultado da busca
    const q = req.query.name as string
    const searchName = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(searchName)
})


app.post('/users', (req: Request, res: Response) => {

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
    // method HTTP(POST)
    // path("/users")
    // body
    // id
    // email
    // password
    // response
    // status 201
    // "Cadastro realizado com sucesso"

})

app.post('/products', (req: Request, res: Response) => {

    // Create Product
    // method HTTP(POST)
    // path("/products")
    // body
    // id
    // name
    // price
    // category
    // response
    // status 201
    // "Produto cadastrado com sucesso"

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
    // method HTTP(POST)
    // path("/purchases")
    // body
    // userId
    // productId
    // quantity
    // totalPrice
    // response
    // status 201
    // "Compra realizada com sucesso"
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


//Get Products by id

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string
    const product = products.find((product) => { return product.id === id })

    product ?
        res.status(200).send(product)
        :
        res.status(200).send("objeto do produto não encontrado")

})