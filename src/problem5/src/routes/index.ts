import { Router } from "express";
import type { Request, Response } from "express";
import userRouter from "./user.routes"; 

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/users", userRouter);

export default router;
