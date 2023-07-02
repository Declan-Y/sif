import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const checkJwt = auth({
  audience: process.env.API_ID,
  issuerBaseURL: process.env.BASE_URL,
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Public endpoint",
  });
});
app.get("/private", checkJwt, (req, res) => {
  res.json({
    message: "private endpoint",
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
