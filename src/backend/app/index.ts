import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

import { checkRouter } from "./router/checkRouter";
import { pencarianRouter } from "./router/pencarianRouter";
import { penyakitRouter } from "./router/penyakitRouter";
const app = express();

app.use(bodyParser.json());

app.use("/similarity", checkRouter);
app.use("/search",pencarianRouter);
app.use("/penyakit",penyakitRouter);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})