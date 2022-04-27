import express, {Request, Response} from "express";

import * as penyakitModel from "../models/penyakit";


import {Penyakit} from "../types/Penyakit";

const checkRouter = express.Router();



checkRouter.post("/", async (req: Request, res: Response) =>{
    penyakitModel.findSimilar(req.body.namaPengguna, req.body.namaPenyakit, req.body.sequence, (err: Error, results: any) => {
        if (err) {
            console.log(err);
            return res.status(500).json({"messages": "Internal server error"});
        }

        console.log(results);
        //ini nyesuaiin dari ave
        if(results.length === 0){
            res.status(404).json({"messages": "Data not found"});
        }else{
            res.status(200).json({"data": results});
        }
    });
});




export { checkRouter };