import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./src/Config";
import NotFound from "./src/Middleware/NotFound";
import ErrorHandler from "./src/Middleware/ErrorHandler";
import Route from "./src/Router";
import { createConnection } from "typeorm";
const app = express();
const main = async () => {
  try {
    const db = await createConnection();
    console.log(`DB connected`);
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(Route);
    app.use(NotFound);
    app.use(ErrorHandler);
    app.listen(PORT, () => {
      console.log(`App Started at port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

main();
