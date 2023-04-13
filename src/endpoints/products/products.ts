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
    const result = await db("products");
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

  const result = await db("products").where({ name: search });
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

    if (!id || !name || !price) {
      res.status(400);
      throw new Error("Dados inválidos");
    }
    const isProductInDB = await db("products").where({ id: id });
    if (isProductInDB.length > 0) {
      res.status(400);
      throw new Error("Produto ja cadastrado");
    }
    if (typeof price !== "number") {
      res.status(400);
      throw new Error("Dados inválidos");
    }
    if (name.length < 3) {
      res.status(400);
      throw new Error("Nome precisa ter pelo menos 3 caracteres");
    }
    const newProduct = {
      id: id,
      name: name,
      price: price,
    };
    await db("products").insert(newProduct);
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

router.get("/search/:id", async (req: Request, res: Response) => {
  /**
     * @name Get Products by id
       @method HTTP (GET)
       @path ("/products/:id")
       @response status 200 objeto encontrado do arquivo .db
     */
  try {
    const id = req.params.id;
    const result = await db("products").where({ id: id });
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
    const id = req.params.id as string;
    const [product] = await db("products").where({ id: id });
    if (product) {
      await db("products").del().where({ id: id });
    } else {
      res.status(404);
      throw new Error("Produto não encontrado");
    }

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

router.put("/:id", async (req: Request, res: Response) => {
  /**
   * @method HTTP (PUT)
      @path ("/products/:id")
      @body name (parâmetro opcional) price (parâmetro opcional)category (parâmetro opcional)
      @response status 200,  "Produto atualizado com sucesso"
   */

  try {
    const id = req.params.id as string;

    const name = (req.body.name as string) || undefined;
    const price = (req.body.price as number) || undefined;

    if (name !== undefined) {
      if (typeof name !== "string") {
        throw new Error("name precisa ser do tipo string");
      }
    }
    if (price !== undefined) {
      if (typeof price !== "number") {
        throw new Error("price precisa ser do tipo number");
      }
    }

    const [product] = await db("products").where({ id: id });

    if (product) {
      const updateProduct = {
        name: name !== undefined ? name : product.name,
        price: price !== undefined ? price : product.price,
      };
      await db("products").where({ id: id }).update(updateProduct);
    } else {
      throw new Error("id não encontrada.");
    }
    res.status(201).send("Produto alterado com sucesso.");
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
export default router;
