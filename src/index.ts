import express from "express";
import cors from 'cors'
import userRouters from './endpoints/users/users'
import productsRouter from './endpoints/products/products'
import purchaseRouter from './endpoints/purchases/purchases'

const app = express()


app.use(express.json())

app.use(cors())


app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})


app.use('/users', userRouters)
app.use('/products', productsRouter)
app.use('/purchases',purchaseRouter)
