import express from "express";
import type { Request, Response } from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

// mount routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
