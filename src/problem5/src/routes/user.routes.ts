import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../prisma";

const router = Router();

interface CreateUserBody {
  name: string;
  email: string;
}

interface UserParams {
  id: string;
}

// CREATE
router.post(
  "/",
  async (req: Request<{}, {}, CreateUserBody>, res: Response) => {
    try {
      const user = await prisma.user.create({
        data: req.body,
      });
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

// READ ALL
router.get("/", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// READ ONE
router.get(
  "/:id",
  async (req: Request<UserParams>, res: Response) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  }
);

// UPDATE
router.put(
  "/:id",
  async (
    req: Request<UserParams, {}, CreateUserBody>,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);
      const user = await prisma.user.update({
        where: { id },
        data: req.body,
      });
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

// DELETE
router.delete(
  "/:id",
  async (req: Request<UserParams>, res: Response) => {
    try {
      await prisma.user.delete({
        where: { id: Number(req.params.id) },
      });
      res.json({ message: "Deleted successfully" });
    } catch (err: any) {
      res.status(404).json({ error: "User not found" });
    }
  }
);

export default router;
