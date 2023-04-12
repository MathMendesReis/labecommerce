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
    const result = await db.raw(`
            SELECT * FROM users
        `);

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

    await db.raw(`
        INSERT INTO users
        (id,email,password)
        VALUES
        ('${id}','${email}','${password}')
        `);

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

    const result = await db.raw(`
      SELECT * FROM purchases
      WHERE buyer = '${id}'
    `);
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

    await db.raw(`
    DELETE FROM users
    WHERE id = '${id}'
    `);

    res.status(201).send("User apagado com sucesso");
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

    console.log(id);
    console.log(newEmail);
    console.log(newPassword);

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

    const [user] = await db.raw(`
   SELECT * FROM users
   WHERE id = '${id}'
`);

    if (user) {
      await db.raw(`
      UPDATE users
      SET
      email = '${newEmail || user.email}',
      password = '${newPassword || user.password}'
      WHERE id = '${id}'
   `);
    } else {
      res.status(404);
      throw new Error("id' não encontrada");
    }

    res.status(201).send("Cadastro atualizado com sucesso");
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
