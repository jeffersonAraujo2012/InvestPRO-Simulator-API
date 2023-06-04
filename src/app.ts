import express, { Express } from "express";
import cors from "cors";
import authRouter from "./routers/auth.routes";
import { connectDb, disconnectDB } from "./config/database";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

init()
  .then(() => {
    app.listen(5000, () => {
      console.log("App is online at port 5000");
    });
  })
  .catch(async () => await close());
