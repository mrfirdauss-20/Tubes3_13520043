import express, {Request, Response} from "express";

import * as penyakitModel from "../models/penyakit";


import {Penyakit} from "../types/Penyakit";

const penyakitRouter = express.Router();


penyakitRouter.post("/", async (req: Request, res: Response) => {
    const nama_penyakit: string = req.body.nama_penyakit;
    const sequence: string = req.body.sequence;
    console.log("tes",nama_penyakit, sequence);
    penyakitModel.insertPenyakit(nama_penyakit,sequence, (err: Error, result: Penyakit) => {
        if (err) {
            console.log(err);
            return res.status(500).json({"messages": "Internal server error"});
        }
        return res.status(200).json({"messages": "Penyakit inserted"});
    });
});


export { penyakitRouter };