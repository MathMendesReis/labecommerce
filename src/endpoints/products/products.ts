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
    const result = await db("products")
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


  try {
    const search = req.params.search as string;
    if (typeof search !== 'string') {
      res.status(404)
      throw new Error("Name precisa ser string.");

    }

    const result = await db("products").whereRaw("LOWER(name) = ?", search.toLowerCase())

    if (result.length < 0) {
      res.status(404)
      throw new Error("Produto não encontrado");

    }

    res.status(200).send(result);
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

    if (id !== undefined) {
      if (typeof id !== 'string') {
        res.status(400)
        throw new Error(`ID precisa ser uma string`)
      }
    } else {
      res.status(404)
      throw new Error("ID precisa ser preenchido!");
    }

    if (id !== name) {
      if (typeof name !== 'string') {
        res.status(400)
        throw new Error(`name precisa ser uma string`)
      }
    } else {
      res.status(404)
      throw new Error("name precisa ser preenchido!");
    }

    if (price !== undefined) {
      if (typeof price !== 'number') {
        res.status(400)
        throw new Error(`price precisa ser uma number`)
      }
    } else {
      res.status(404)
      throw new Error("price precisa ser preenchido!");
    }

    const newProduct = {
      id: id,
      name: name,
      price: price
    }

    const isProduct = await db("products").where({ id: id })
    if (isProduct.length > 0) {
      res.status(404)
      throw new Error("Produto ja cadastradao");

    } else {

      await db("products").insert(newProduct)
      res.status(201).send(`Produto cadastrado com sucesso.`);
    }

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
    const result = await db("products").where({ id: id })
    if (result.length <= 0) {
      res.status(404)
      throw new Error("Produto não cadastrado");
    }
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

    const isProduct = await db("products").where({ id: id })
    if (isProduct.length <= 0) {
      res.status(404)
      throw new Error("Produto não encontrado");
    }

    await db("products").del().where({ id: id })

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
    const id = req.params.id as string
    const newName = req.body.newName as string || undefined
    const newPrice = req.body.newPrice as number || undefined

   
    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(404)
        throw new Error("name precisa ser uma string");

      }
    }
    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(404)
        throw new Error("price precisa ser uma number");

      }
    }

    const [product] = await db("products").where({ id: id })

    if (!product) {
      res.status(404)
      throw new Error("'id' não encontrada")
    }

    const updateProduct = {
      id: product.id,
      name: newName !== undefined? newName: product.name,
      price: newPrice !== undefined? newPrice:product.price 
    }
    
    await db("products").update(updateProduct).where({ id: id })

    res.status(201).send("Produto alterado com sucesso!")
  }
  catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Error inesperado.")
    }
  }
});
export default router;
