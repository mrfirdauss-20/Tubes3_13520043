import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
// import bodyParser from "body-parser";
dotenv.config();

import { checkRouter } from "./router/checkRouter";
import { pencarianRouter } from "./router/pencarianRouter";
import { penyakitRouter } from "./router/penyakitRouter";
import { BoyerMoore, KnuthMorrisPratt } from "./lib/string_matcher";
const app = express();

app.use(express.json());

//-> ini post jadi kirimnya pake form 
app.use("/similarity", checkRouter);

// localhost:3000/search/?nama_penyakit=penyakit&tanggal=2020-01-01
app.use("/search",pencarianRouter);

//
app.use("/penyakit",penyakitRouter);

app.listen(process.env.PORT,async ()=>{
    // load border data
    await KnuthMorrisPratt.loadData();
    // load last occurence data
    await BoyerMoore.loadData();
    console.log(`listening on port ${process.env.PORT}`);
})