import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

app.use(cors());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;