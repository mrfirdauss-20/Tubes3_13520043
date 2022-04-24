import express, {Request, Response} from "express";

import * as penyakitModel from "../models/penyakit";


import {Penyakit} from "../types/Penyakit";

const penyakitRouter = express.Router();


penyakitRouter.post("/", async (req: Request, res: Response) => {
    const penyakit: Penyakit = req.body;
    penyakitModel.insertPenyakit(penyakit, (err: Error, result: any) => {
        if (err) {
            console.log(err);
            return res.status(500).json({"messages": "Internal server error"});
        }
        res.send(200).json({"messages": "Penyakit inserted"});
    });
});




export { penyakitRouter };