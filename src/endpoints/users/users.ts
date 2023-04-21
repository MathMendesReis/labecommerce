import express, { Response, Request } from "express";
import { db } from "../../database/knex";
import { verifyStrings } from "../../functions";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  /**
   * @method HTTP (GET)
   * @name Get All Users
   * @path ("/users")
   * @response status 200,array de users do database.ts
   */

  try {
    const result = await db("users")

    res.status(200).send(result);
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send(`Erro inesperado.`);
    }
  }
});

router.post("/", async (req: Request, res: Response) => {
  /**
     * @name Create User
        @method HTTP (POST)
        @path ("/users")
        @body id, email, password
        @response status 201 cadastro realizado com sucesso
     */
  try {
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (id !== undefined) {
      if (typeof id !== 'string') {
        res.status(404)
        throw new Error(`id tem que ser uma string`)
      }
    } else {
      res.status(400)
      throw new Error(`id não pode ser undefined`)
    }

    if (email !== undefined) {
      if (typeof email !== 'string') {
        res.status(404)
        throw new Error(`email tem que ser uma string`)
      }
    } else {
      res.status(400)
      throw new Error(`email não pode ser undefined`)
    }
    if (password !== undefined) {
      if (typeof password !== 'string') {
        res.status(404)
        throw new Error(`password tem que ser uma string`)
      }
    } else {
      res.status(400)
      throw new Error(`password não pode ser undefined`)
    }

    const [product] = await db("products").where({id:id})

    if(product){
      res.status(404)
      throw new Error (`Produto ja cadastrado`)
    }


    const newProduct = {
      id: id,
      email: email,
      password: password
    }

    await db("users").insert(newProduct)

    res.status(201).send(`Cadastro realizado com sucesso.`);
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

router.get("/:id/purchases", async (req: Request, res: Response) => {
  /**
   * @name Get User Purchases by User id
   * @path ("/users/:id/purchases")
   * @response status 200 array de compras do user no arquivo .db
   */
  try {
    const id = req.params.id as string;

    const result = await db("users").where({id:id})

    if(result.length < 1){
      res.status(400)
      throw new Error(`Produto não encontrado`)
    }
    res.status(201).send(result);
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

router.delete("/:id", async (req: Request, res: Response) => {
  /**
   * 
    @name Delete User by id
    @method HTTP (DELETE)
    @path ("/users/:id")
    @response status 200, "User apagado com sucesso"
   */
  try {
    const id = req.params.id;

    const isUser = await db("users").where({id:id})
    if(isUser.length < 1){
      res.status(404)
      throw new Error(`User não encontrado`)
    }

    await db("users").del().where({id:id})

    res.status(201).send(`Usuario excluido com sucesso.`);
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
   *@name Edit User by id
    @method HTTP (PUT)
    @path ("/users/:id")
    @body  email (parâmetro opcional),password (parâmetro opcional)
    @response status 200 "Cadastro atualizado com sucesso"
   */

  try {
    const id = req.params.id as string;
    const newEmail = (req.body.newEmail as string) || undefined;
    const newPassword = (req.body.newPassword as string) || undefined;


    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("'newEmail' deve ser string");
      }
      if (!newEmail.includes("@")) {
        res.status(400);
        throw new Error("'newEmail' deve conter o caractere @");
      }
    }
    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("'newPassword' deve ser string");
      }
    }

    const [user] = await db("users").where({id:id})
    

    if (!user) {
      res.status(404);
      throw new Error("id' não encontrada");
    } 

    const updateUser = {
      email: newEmail !== undefined?newEmail : user.email,
      password: newPassword !==undefined? newPassword : user.password
    }
    await db("users").update(updateUser).where({id:id})

    res.status(201).send("cadastro alterado");
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

export default router;
