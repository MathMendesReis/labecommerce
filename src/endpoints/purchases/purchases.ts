import { products, purchase } from "./../../database";
import Express, { Response, Request, Router } from "express";
import { db } from "../../database/knex";
import { verifyStrings } from "../../functions";

const router = Express();

router.post("/", async (req: Request, res: Response) => {
  /**
@method HTTP (POST)
@name Create Purchase
@path ("/purchases")
@body userId,productId,quantity,totalPrice
@response status 201 "Compra realizada com sucesso"
 */
  try {
    const id = req.body.id as string;
    const buyer = req.body.buyer as string;
    const paid = req.body.paid as number;
    const product_id = req.body.product_id as string[]
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // os meses em JavaScript são baseados em zero, então adicionamos 1 para obter o mês correto
    const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

    if (!id) {
      res.status(404)
      throw new Error("Insira todos os campos");
    }

    const user = await db("users").where({ id: buyer })
    if (user.length < 1) {
      res.status(404)
      throw new Error("Usuario não encontrado")
    }

 

    for (let index = 0; index < product_id.length; index++) {
        const products = await db("products").where({id:product_id[index]})
        if (products.length < 1) {
          res.status(404)
          throw new Error("produto não encontrado")
        }
    }
    

    let sumPriceTotal = 0
    for (let index = 0; index < product_id.length; index++) {
      const [product] = await db("products")
      .where({id:product_id[index]})
      
      sumPriceTotal += product.price
    }
    const product_idJSON = JSON.stringify(product_id);

    const newPurchase = {
      id: id,
      buyer: buyer,
      total_price: sumPriceTotal,
      created_at: formattedDate,
      paid: paid
    }

    const newPurchaseProducts = {
      purchase_id:id,
      product_id: product_idJSON,
      quantity:product_id.length
    }

    await db.insert(newPurchaseProducts).into("purchases_products")
    await db.insert(newPurchase).into("purchases")
    res.status(201).send("Compra realizada com sucesso");
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(`Error inesperado`);
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {


    const result = await db("purchases")

    res.status(201).send(result);
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(`Error inesperado`);
    }
  }
});




router.get('/:id', async (req: Request, res: Response) => {
  /**
   * @name {Get Purchase by id}
   */
  try {
    const id = req.params.id

    if (typeof id !== 'string') {
      res.status(404)
      throw new Error("ID não pode ser string");
      
    }

    const [user] = await db("users").where({ id: id })
    if (!user) {
      res.status(404)
      throw new Error("Usuario não encontrado")
    }

    const [purchase] = await db("purchases")
    .select()
    .where({"purchases.id":id})
    .innerJoin("users", "purchases.buyer", "=", "users.id")
    

    const [products] = await db("purchases_products")
    .where({purchase_id:id})

    const arrayProductsProduct_id = JSON.parse(products.product_id);


    let product = []
    for (let index = 0; index < arrayProductsProduct_id.length; index++) {
        const [productInBDB] = await db("products")
        .select()
        .where({id:arrayProductsProduct_id[index]})
        product.push(productInBDB)
    }

    const totalPriceSum = products.total_price 
        
    if(!purchase){
      res.status(404)
      throw new Error("Compra não encontrada");
    }
    
    const result = {
      ...purchase,
      products:product
    }
    res.status(200).send(result)
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(`Error inesperado`);
    }
  }
})


router.delete("/",async(req:Request, res:Response)=>{
  try {
    
    await db("purchases").del()
    await db("purchases_products").del()

    res.status(200).send("Purchases deletas com sucesso")
  } catch (error:any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(`Error inesperado`);
    }
    
  }
})








export default router;
