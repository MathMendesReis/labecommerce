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
    const created_at = req.body.created_at as string;
    const paid = req.body.paid as number;
    const product_id = req.body.product_id as string
    const quantity = req.body.quantity as number

    if (!id) {
      res.status(404)
      throw new Error("Insira todos os campos");
    }

    const user = await db("users").where({ id: buyer })
    if (user.length < 1) {
      res.status(404)
      throw new Error("Usuario não encontrado")
    }

    const products = await db("products").where({id: product_id})
    if (products.length < 1) {
      res.status(404)
      throw new Error("produto não encontrado")
    }
    

    const [product] = products
    const sumPriceTotal = quantity * product.price

    const newPurchase = {
      id: id,
      buyer: buyer,
      total_price: sumPriceTotal,
      created_at: created_at,
      paid: paid
    }

    const newPurchaseProducts = {
      purchase_id:id,
      product_id: product_id,
      quantity:quantity
    }

    await db.insert(newPurchaseProducts).into("purchases_products")
    await db.insert(newPurchase).into("purchases")
    res.status(201).send(`Compra realizada com sucesso`);
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

    const [user] = await db("users").where({ id: id })
    if (!user) {
      res.status(404)
      throw new Error("Usuario não encontrado")
    }

    const [purchase] = await db("purchases")
    .select()
    .where({"purchases.id":id})
    .innerJoin("users", "purchases.buyer", "=", "users.id")
    

    const products = await db("purchases_products")
    .select("products.*")
    .where({purchase_id:id})
    .leftJoin("products","purchase_id","=","products.id")
    
    
    const result = {
      purchase,
      products:products
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








export default router;
