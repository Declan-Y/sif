import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import expressSession from "express-session";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: "https://localhost:3000",
  clientID: "B8BtoZkwNhUf1qcl0IiLMoFFKYt3YsYZ",
  issuerBaseURL: "https://dev-5x0s2u4w2onpnsxq.us.auth0.com",
};
app.use(auth(config));
app.get("/", (req: Request, res: Response) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
