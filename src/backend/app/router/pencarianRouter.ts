import express, {Request, Response} from "express";
import * as pencarianModel from "../models/pencarian";

import { PencarianP } from "../types/Pencarian";

const pencarianRouter = express.Router();

pencarianRouter.get("/", async (req: Request, res: Response) => {
    pencarianModel.findAll((err: Error, results: PencarianP[]) => {
        if (err) {
            console.log(err);
            return res.status(500).json({"messages": "Internal server error"});
        }
    if(results.length === 0){
        res.status(404).json({"messages": "Data not found"});
    }else{
        res.status(200).json({"data": results});
    }
    });
});

pencarianRouter.get("/", async (req: Request, res: Response) => {
    const namaPenyakit = req.query.nama_penyakit.toString();
    const tanggal = req.query.tanggal.toString();
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