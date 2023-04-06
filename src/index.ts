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


app.get("/users", (req: Request, res: Response) => {


    // Get All Users
    try {
        res.status(200).send(users)
    } catch (error: any) {
        res.status(400).send(error.message)
    }
})


app.get("/products", (req: Request, res: Response) => {
    // Get All Products
    try {
        res.status(200).send(products)
    } catch (error: any) {
        res.status(400).send(error.message)

    }
})


app.get('/products/:name', (req: Request, res: Response) => {
    // Search Product by name
    try {
        const name = req.params.name
        const productById = products.find((product) => product.name.toLocaleLowerCase() === name.toLocaleLowerCase())

        if (name === undefined) {
            throw new Error('Necessario inserir NOME do Usuario.')
            res.status(401)
        }

        if (!productById) {
            throw new Error('Produto não foi encontrado')
            res.status(404)
        }

        res.status(200).send(productById)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)
    }
})

app.get('/users/:name', (req: Request, res: Response) => {
    try {
        const name = req.params.name

        if (name === undefined) {
            throw new Error('Necessario inserir ID do Usuario.')
        }

        const userByName = users.find((user) => user.name === name)

        if (!userByName) {
            throw new Error('Usuario não foi encontrado')
            res.status(404)
        }

        res.status(200).send(userByName)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }

        res.send(error.message)
    }
})


app.get("/product/search", (req: Request, res: Response) => {
    // Search Product by name
    try {
        const name = req.query.name as string
        if (name === undefined) {
            res.status(422)
            throw new Error("query params deve possuir pelo menos um caractere")
        }
        const result: TProduct[] = products.filter((product) => product.name.toLowerCase() === name.toLowerCase())

        if (result.length > 0) {
            res.status(200).send(result)
        } else {
            res.status(200).send("Produto não cadastrado")

        }

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)
    }
})


app.post('/users', (req: Request, res: Response) => {
    //Create users
    try {
        const DATE = new Date()


        let id = `u${Math.floor(Math.random() * 100)}` as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string
        const createdAt = `${DATE}` as string

        if (!id || !name || !email || !password) {
            throw new Error('Necessario preencher todos os campos obrigatorios.')
        }
        if (users.some((user) => user.id === id)) {
            while (users.find((user) => user.id === id)) {
                id = `u${Math.floor(Math.random() * 100)}` as string
            }
        }

        const newUser: TUser = {
            id,
            name,
            email,
            password,
            createdAt
        }
        users.push(newUser)
        res.status(201).send('cadastro realizado com sucesso')

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)
    }
})


app.post('/products', (req: Request, res: Response) => {
    // // create product
    try {
        let id = `${Math.floor(Math.random() * 100)}`
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string
        const category = req.body.category as CATEGORYS

        if (!name || !price || !description || !imageUrl || !category) {
            throw new Error("Necessario preencher todos os campos obrigatorios")
        }

        // for (let value of Object.values(CATEGORYS)) {
        //     if (value !== category) {
        //         throw new Error("Categoria não encontrada.")
        //     }
        // }

        if (products.some((user) => user.id === id)) {
            throw new Error('Produto ja existe na base de dados')
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            imageUrl,
            category
        }
        products.push(newProduct)
        res.status(201).send("produto criado com sucesso")
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)
    }

})



app.post('/purchases', (req: Request, res: Response) => {
    try {
        const userId = req.body.userId as string
        const productId = req.body.productId as string

        if (!userId || !productId) {
            throw new Error('Necessario preencher todos os campos obrigatorios')
        }
        const isUser = users.some((user) => { user.id === userId })
        if (isUser) {
            throw new Error("Usuario não esta cadastrado")
        }

        const prod = products.find((p) => p.id === productId)
        if (!prod) {
            throw new Error("Produto não esta cadastrado")
        }

        const isPurchase = purchase.find((p) => p.userId === userId);

        if (isPurchase !== undefined) {
            isPurchase.quantity += 1
            isPurchase.totalPrice += prod.price
            if (isPurchase.products.some((p) => p.id !== prod.id)) {
                isPurchase.products = [...isPurchase.products, prod]
            }
            res.status(201).send("Compra realizada com sucesso")
        } else {
            const newPurchase: TPurchase = {
                userId,
                productId,
                quantity: 1,
                totalPrice: prod.price,
                products: []
            }
            newPurchase.products.push(prod)
            purchase.push(newPurchase)
            res.status(201).send('Compra realizada com sucesso')
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 200
        }
        res.send(error.message)

    }
})

app.get('/purchase', (req: Request, res: Response) => {
    try {
        res.status(200).send(purchase)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)
    }
})

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const index = users.findIndex((user) => user.id === id)
        if (index >= 0) {
            users.splice(index, 1)
        }
        res.status(200).send('Usuario removido')
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)
    }
})

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const index = products.findIndex((p) => p.id === id)
        if (index >= 0) {
            products.splice(index, 1)
        }

        res.status(200).send('Produto removido com sucesso')

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)

    }
})


app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const name = req.body.name as string | undefined
        const email = req.body.email as string | undefined
        const password = req.body.password as string | undefined

        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error("Nome deve ser uma string")
                res.status(401)
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("email deve ser uma string")
                res.status(401)
            }
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("Email deve ser uma string")
                res.status(401)
            }
        }

        const user = users.find((user) => user.id === id)
        if (user) {
            user.id = id || user.id
            user.name = name || user.name
            user.email = email || user.email
            user.password = password || user.password
        }
        res.status(200).send('Usuario teva os dados atualizados')

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
        res.send(error.message)

    }
})

app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const name = req.body.name as string | undefined
        const price = req.body.price as number | undefined
        const category = req.body.category as CATEGORYS | undefined

        const isProduct = products.find((product) => product.id === id)

        if (isProduct) {
            isProduct.id = id || isProduct.id
            isProduct.name = name || isProduct.name
            isProduct.price = price || isProduct.price
            isProduct.category = category || isProduct.category

        }
        res.status(200).send('Usuario teva os dados atualizados')

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.statusCode = 500
        }
    }
})
