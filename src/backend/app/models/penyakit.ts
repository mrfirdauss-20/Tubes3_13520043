import { Penyakit } from "../types/Penyakit";
import { db } from "../db/db";
import { RowDataPacket } from "mysql2";

export const insertPenyakit= async (penyakit: Penyakit, callback: Function) => {
    const queryStr = "INSERT INTO penyakit (nama,sequence) VALUES ?";
    db.query(
        queryStr,
        [penyakit.nama,penyakit.sequence],
        (err, results) => {
            if (err) {
                console.log(err);
            }
        }
    )
}
