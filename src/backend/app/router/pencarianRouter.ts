import express, {Request, Response} from "express";
import * as pencarianModel from "../models/pencarian";

import { PencarianP } from "../types/Pencarian";

const pencarianRouter = express.Router();

pencarianRouter.post("/", async (req: Request, res: Response) => {
    const namaPenyakit = req.body.nama_penyakit;
    const tanggal = req.body.tanggal;
    pencarianModel.findByNamaPenyakitAndTanggal(namaPenyakit, tanggal, (err: Error, results: PencarianP[]) => {
        if (err) {
            console.log(err);
            return res.status(500).json({"messages": "Internal server error"});
        }
    if(results.length === 0){
        res.status(404).json({"messages": "Data not found"});
    }else{
        res.status(200).json({"data": results});
    }
    })
});

export { pencarianRouter };