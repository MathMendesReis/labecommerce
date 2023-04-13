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
    res.status(200).send(await db("users"));
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

    if (!id || !email || !password) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    const isUserInDB = await db("users").where({ id: id });
    if (isUserInDB.length > 0) {
      res.status(400);
      throw new Error("Usuario ja esta cadastrado.");
    }

    const isEmailInDB = await db("users").where({ email: email });
    if (isEmailInDB.length > 0) {
      res.status(400);
      throw new Error("Email ja esta cadastrado.");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("A senha precisa ter no minimo 6 caracteres.");
    }

    const newUser = {
      id: id,
      email: email,
      password: password,
    };

    await db("users").insert(newUser);

    res.status(201).send({ message: "Cadastro realizado com sucesso!" });
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

    const result = await db("users").where({ id: id });
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
    const id = req.params.id as string;

    const [user] = await db("users").where({ id: id });
    if (user) {
      await db("users").del().where({ id: id });
    } else {
      res.status(404);
      throw new Error(`Usuario não encontrado.`);
    }

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

    const [user] = await db("users").where({ id: id });

    if (user) {
      const updatedUser = {
        email: newEmail !== undefined ? newEmail : user.email,
        password: newPassword !== undefined ? newPassword : user.password,
      };
      await db("users").where({ id: id }).update(updatedUser);
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
