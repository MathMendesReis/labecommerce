import { purchase } from "./../../database";
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
    const total_price = req.body.total_price as number;
    const created_at = req.body.created_at as string;
    const paid = req.body.paid as number;

    if (!id) {
      res.status(404)
      throw new Error("Insira todos os campos");
    }

    const [user] = await db("users").where({ id: buyer })
    if (!user) {
      res.status(404)
      throw new Error("Usuario não encontrado")
    }


    const newPurchase = {
      id: id,
      buyer: buyer,
      total_price: total_price,
      created_at: created_at,
      paid: paid
    }
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
  try {
    const id = req.params.id

    const [user] = await db("users").where({ id: id })
    if (!user) {
      res.status(404)
      throw new Error("Usuario não encontrado")
    }

    const result = await db("users")
      .select()
      .innerJoin(
        "purchases",
        "users.id",
        "=",
        "purchases.buyer"
      )



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
