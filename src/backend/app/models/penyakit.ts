import { Penyakit } from "../types/Penyakit";
import { PencarianP } from "app/types/Pencarian";

import { db } from "../db/db";
import { RowDataPacket } from "mysql2";

export const insertPenyakit= async (namaPenyakit: string, sequence:string, callback: Function) => {
    const queryStr = "INSERT INTO penyakit (nama,sequence) VALUES ?";
    db.query(
        queryStr,
        [namaPenyakit,sequence],
        (err, results) => {
            if (err) {
                callback(err);
            }
        }
    )
}

export const findSimilar = async (namaPengguna: string, namaPenyakit: string, sequence: string, callback: Function) => {
    const queryStr = "SELECT p.id, p.nama as nama_penyakit, p.sequence  as sequence FROM penyakit as p WHERE p.nama = ?;";
    db.query(queryStr, [namaPenyakit], (err, results) => {
        if (err) {callback(err)};
        const rows = <RowDataPacket>results;
        const pepenyakit: Penyakit[] = [];

        rows.forEach(row=>{
            const hasil: Penyakit = {
                id: row.id,
                nama: row.nama_penyakit,
                sequence: row.sequence
            }
            pepenyakit.push(hasil);
        });
        // drop string comparing function here
        
        const isValid =1;
        const tanggal = new Date();
        // insert data
        const queryStr = "INSERT INTO hasil_tes (id_penyakit,tanggal,nama_pengguna,hasil) VALUES ?";
        db.query(
            queryStr,
            [pepenyakit[0].id,tanggal,namaPengguna,isValid],
            (err, results) => {
                if(err){
                    callback(err);
                }
            }
        )

        const search: PencarianP = {
            namaPenyakit: namaPenyakit,
            tanggal: tanggal,
            namaPengguna: namaPengguna,
            hasil: isValid 
        }

        callback(null, search); //switch pepenyakit dengan jawaban
    })

}
