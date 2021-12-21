import express, { Request, Response } from "express";

const router = express.Router()

interface User {
    name: string;
    email: string;
}

let users: Array<User> = [];

router.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.send(users);
    }
);

router.post(
  "/users/add",
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user)
    return res.send(user)
  }
);

export default router;