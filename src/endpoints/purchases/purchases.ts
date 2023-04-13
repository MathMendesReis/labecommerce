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
    const total_price = req.body.totalPrice as number;
    const created_at = req.body.created_at as string;
    const paid = req.body.paid as number;

    if (!id || !buyer || isNaN(total_price) || !created_at || !isNaN(paid)) {
      res.status(400);
      throw new Error("Dados invalidos");
    }

    const [purchase] = await db("purchases").where({ id: id });
    if (purchase) {
      res.status(400);
      throw new Error("insira um id diferente");
    }

    const isString = verifyStrings(id, buyer, created_at);
    if (isString) {
      res.status(400);
      throw new Error("Os campos id, buyer e created_at devem ser strings");
    }

    const newPurchases = {
      id: id,
      buyer: buyer,
      total_price: total_price,
      created_at: created_at,
      paid: paid,
    };
    await db.insert(newPurchases).into("purchases");

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
    const result = await db("purchases");

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
export default router;
