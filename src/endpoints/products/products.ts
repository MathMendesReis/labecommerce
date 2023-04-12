import { products } from "./../../database";
import Express, { Response, Request } from "express";
import { db } from "../../database/knex";
import { verifyStrings } from "../../functions";

const router = Express();

router.get("/", async (req: Request, res: Response) => {
  /**
     *  @name Get All Products
        @method HTTP (GET)
        @path ("/products")
        @response
        @status 200
        @return array de products do database.ts
     */

  try {
    const result = await db.raw(`
            SELECT * FROM products
        `);
    res.status(200).send(result);
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(`Erro inesperado`);
    }
  }
});
router.get("/:search", async (req: Request, res: Response) => {
  /**
     * @name Search Product by name
        @method HTTP (GET)
        @path ("/product/search")
        @query params q
        @response status 200
        @return array do resultado da busca
    */

  const search = req.params.search as string;

  const result = await db.raw(`
        SELECT * FROM products
        WHERE LOWER(name) = LOWER('${search}')
    `);
  res.status(200).send(result);
  try {
  } catch (error: any) {}
});

router.post("/", async (req: Request, res: Response) => {
  /**
   @method HTTP (POST)
   *@name Create Product
   @path ("/products")
   @body id,name,price,category
   @response status 201,"Produto cadastrado com sucesso"
   */
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;

    await db.raw(`
        INSERT INTO products
        (id,name,price,description,image_url)
        VALUES
        ('${id}','${name}',${price})
        `);
    res.status(201).send(`Produto cadastrado com sucesso.`);
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

router.get("/name/:id", async (req: Request, res: Response) => {
  /**
     * @name Get Products by id
        @method HTTP (GET)
       @path ("/products/:id")
       @response status 200 objeto encontrado do arquivo .db
     */
  try {
    const id = req.params.id;
    const result = await db.raw(`
        SELECT * FROM products
        WHERE id = '${id}'
      `);
    res.status(201).send(result);
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
});

router.delete("/:id", async (req: Request, res: Response) => {
  /**
   * 
    @name Delete Product by id
    @method HTTP (DELETE)
    @path ("/products/:id")
    @response status 200, "User apagado com sucesso"
   */
  try {
    const id = req.params.id;

    await db.raw(`
    DELETE FROM products
    WHERE id = '${id}'
    `);

    res.status(201).send("Produto apagado com sucesso");
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(`Erro inesperado`);
    }
  }
});

router.put("/", async (req: Request, res: Response) => {
  /**
   * @method HTTP (PUT)
      @path ("/products/:id")
      @body name (parâmetro opcional) price (parâmetro opcional)category (parâmetro opcional)
      @response status 200,  "Produto atualizado com sucesso"
   */
});
export default router;
